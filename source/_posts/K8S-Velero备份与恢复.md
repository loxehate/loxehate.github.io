---
title: K8S-Velero备份与恢复
tags: [kubernetes]
categories: [云原生]
date: 2026-09-01
--- 
**一、引言：为什么 K8s 备份恢复如此重要？**
--------------------------

在 Kubernetes 集群规模化应用的今天，集群内的资源（Deployment、ConfigMap、Secret 等）和数据（存储卷 PVC/PV）已成为业务运行的核心载体。然而，以下场景可能导致数据丢失或集群故障：

*   误操作（如误删 namespace、关键资源）
*   集群升级失败、配置错误
*   基础设施故障（如节点宕机、存储损坏）
*   恶意攻击或病毒入侵

传统的物理机 / 虚拟机备份方案无法适配 K8s 的动态资源调度和分布式存储特性，而**Velero**（曾用名 Heptio Ark）作为 CNCF 毕业项目，专为 K8s 设计，能实现集群资源与数据的备份、恢复及迁移，是保障 K8s 环境稳定性的关键工具。

*   [Velero 官方文档](https://velero.io/docs/ "Velero 官方文档")
*   [Velero GitHub 仓库](https://github.com/vmware-tanzu/velero "Velero GitHub 仓库")
*   [Kubernetes 备份最佳实践白皮书](https://www.cncf.io/wp-content/uploads/2022/05/Kubernetes-Backup-and-Recovery-Best-Practices.pdf "Kubernetes 备份最佳实践白皮书")

**二、Velero 核心概念与工作原理**
----------------------

#### 1\. 核心概念

*   **Backup（备份）**：包含 K8s 资源（如 Pod、Service）和关联存储卷快照的集合，存储在指定的外部存储位置。
*   **Restore（恢复）**：从 Backup 中还原资源和数据到集群的过程，支持部分恢复或全量恢复。
*   **VolumeSnapshot（卷快照）**：对 PV（持久卷）的快照，依赖底层存储提供商的快照能力（如 AWS EBS、Ceph RBD）。
*   **BackupStorageLocation（BSL）**：备份数据（资源清单、元数据）的存储位置（如 S3、GCS、Azure Blob 等对象存储）。
*   **VolumeSnapshotLocation（VSL）**：卷快照的存储位置，需与底层存储类型匹配（如 AWS、GCP、本地存储）。

#### 2\. 工作原理

Velero 通过以下组件实现功能：

*   **客户端（velero CLI）**：用户操作入口，用于发起备份、恢复等命令。
*   **服务端（Velero Deployment）**：运行在 K8s 集群内，处理备份 / 恢复逻辑，与 API Server 交互。
*   **自定义资源（CRD）**：通过 Backup、Restore 等 CRD 定义备份策略和执行状态。

**备份流程**：

1.  用户通过 CLI 创建 Backup 对象，指定备份范围（全集群 / 命名空间 / 标签筛选）、存储位置等。
2.  Velero 服务端监听 Backup 对象，先备份 K8s 资源（序列化为 JSON）并上传至 BSL。
3.  若需备份 PV，Velero 调用底层存储接口创建 VolumeSnapshot，并将快照元数据存储至 VSL。
4.  备份完成后，更新 Backup 对象状态为 “Completed”。

**恢复流程**：

1.  用户指定 Backup 创建 Restore 对象，定义恢复范围（可选）。
2.  Velero 从 BSL 下载资源清单，重建 K8s 资源（Deployment、Service 等）。
3.  若包含 PV，从 VSL 恢复 VolumeSnapshot 为新的 PV，并关联至对应 PVC。

**三、Velero 安装与配置（实战步骤）**
------------------------

> Velero（原 Heptio Ark）的核心设计目标是备份 Kubernetes 集群中的**声明式资源**（如 PVC/PV、StatefulSet 等）和**持久化数据。类似于**emptyDir与HostPath就不能使用。

#### 1\. 前提条件

*   K8s 集群（v1.16+，推荐 v1.20+），已配置 kubectl 访问权限。本文K8S配置为1.32.6.
*   外部存储（如 AWS S3、MinIO、阿里云 OSS 等 S3 兼容存储），用于存储备份数据。本文使用minio作为对象存储。
*   存储卷快照支持（如使用 Rook/Ceph、AWS EBS 等，需提前配置 StorageClass）。本文使用csi-nfs-StorageClass.

#### 2\. 安装 Velero 客户端

注意，velero是存在与K8S的版本对应关系的。请注意自己的K8S版本信息。

```bash
# 下载对应版本（以v1.16.1为例）
wget https://github.com/vmware-tanzu/velero/releases/download/v1.16.1/velero-v1.16.1-linux-amd64.tar.gz
tar -zxvf velero-v1.16.1-linux-amd64.tar.gz
cp -a velero-v1.16.1-linux-amd64/velero /usr/local/bin/ 
root@k8s-master:~# velero version
Client:	Version: v1.16.1	
Git commit: 2eb97fa8b187f9ed0aeb49f216565eddf93a0b08
Server:	Version: v1.16.1
```

#### 3\. 配置备份存储位置（以 MinIO 为例）

##### 3.1 安装minio

```bash
mkdir -p /data/minio/
 
docker run --net=host \
--name minio \
-d --restart=always \
-e "MINIO_ACCESS_KEY=admin" \
-e "MINIO_SECRET_KEY=Minio1234" \
-v /data/minio/data:/data \
quay.io/minio/minio:latest server \
/data \
--console-address ":9090" \
-address ":9000"
```

访问：http://IP+9000 

![](%E5%9B%BE%E7%89%87/minio1.png)

创建一个bucket给velero做备份使用： 

![](%E5%9B%BE%E7%89%87/minio2.png)

![](%E5%9B%BE%E7%89%87/minio3.png)

![](%E5%9B%BE%E7%89%87/minio4.png)

*   准备 MinIO 访问密钥（access-key）、密钥（secret-key）。
*   创建 credentials 文件：

```bash
cat >/opt/velero/velero-auth.txt << EOF
[default]
aws_access_key_id = admin
aws_secret_access_key = Minio1234
EOF
```

*   部署 Velero 服务端：

这里需要注意，在最后一行中s3Url需要修改为你自己的minio节点IP。

```bash
velero install \
--kubeconfig  /root/.kube/config \
--provider aws \
--plugins velero/velero-plugin-for-aws:latest \
--use-volume-snapshots=false  \
--uploader-type=restic \
--use-node-agent \
--bucket k8s-backup \
--secret-file /opt/velero/velero-auth.txt \
--log_file_max_size 512 \
--backup-location-config region=minio,s3ForcePathStyle="true",s3Url=http://10.0.0.8:9000
 
## 验证是否安装成功
root@k8s-master:~# kubectl get po -n velero
NAME                     READY   STATUS    RESTARTS   AGE
node-agent-mbllk         1/1     Running   0          12s
node-agent-pgdvx         1/1     Running   0          12s
velero-bdc68dd56-js5dq   1/1     Running   0          12s
 
root@k8s-master:~# kubectl  api-versions  | grep velero
velero.io/v1
velero.io/v2alpha1
```

#### 4\. 实战演练

##### 4.1 创建测试备份数据（pod）

```bash
root@k8s-master:~/pod# cat pod-sc-deploy.yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: deploy-pvc-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      apps: v1
  template:
    metadata:
      labels:
        apps: v1
    spec:
      volumes:
      - name: data
        # 声明存储卷的类型是pvc
        persistentVolumeClaim:
          # 声明pvc的名称
          claimName: velero-pvc-sc
      - name: dt
        hostPath:
         path: /etc/localtime
      initContainers:
      - name: init01
        image: registry.cn-hangzhou.aliyuncs.com/yinzhengjie-k8s/apps:v1
        volumeMounts:
        - name: data
          mountPath: /bak
        - name: dt
          mountPath: /etc/localtime
        command:
        - /bin/sh
        - -c
        - date -R > /bak/index.html ; dd if=/dev/zero of=/bak/haha.txt bs=1M count=75
      containers:
      - name: c1
        image: registry.cn-hangzhou.aliyuncs.com/yinzhengjie-k8s/apps:v1
        volumeMounts:
        - name: data
          mountPath: /usr/share/nginx/html
        - name: dt
          mountPath: /etc/localtime
```

验证数据确实已经存在 

```bash
root@k8s-master:~/pod# kubectl get po
NAME                               READY   STATUS    RESTARTS   AGE
deploy-pvc-demo-6464949fc4-82r8v   1/1     Running   0          62s
deploy-pvc-demo-6464949fc4-mlrn6   1/1     Running   0          55s
deploy-pvc-demo-6464949fc4-r5d65   1/1     Running   0          69s
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-82r8v -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:27 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:27 index.html
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-mlrn6 -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:27 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:27 index.html
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-r5d65 -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:27 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:27 index.html
root@k8s-master:~/pod# kubectl get po -o wide
NAME                               READY   STATUS    RESTARTS   AGE    IP               NODE        NOMINATED NODE   READINESS GATES
deploy-pvc-demo-6464949fc4-82r8v   1/1     Running   0          110s   10.100.36.75     k8s-node1   <none>           <none>
deploy-pvc-demo-6464949fc4-mlrn6   1/1     Running   0          103s   10.100.169.137   k8s-node2   <none>           <none>
deploy-pvc-demo-6464949fc4-r5d65   1/1     Running   0          117s   10.100.169.136   k8s-node2   <none>           <none>
root@k8s-master:~/pod# curl 10.100.36.75
Wed, 30 Jul 2025 15:27:18 +0800
```

##### 4.2 备份数据

```bash
root@k8s-master:~# velero backup create 0730all-bak --include-resources pods,pv,pvc  --include-namespaces default
Backup request "0730all-bak" submitted successfully.
Run `velero backup describe 0730all-bak` or `velero backup logs 0730all-bak` for more details.
 
root@k8s-master:~# velero backup get
NAME                  STATUS      ERRORS   WARNINGS   CREATED                         EXPIRES   STORAGE LOCATION   SELECTOR
0730all-bak           Completed   0        0          2025-07-30 15:32:03 +0800 CST   29d       default            <none>
pod-specific-backup   Completed   0        0          2025-07-30 14:41:13 +0800 CST   29d       default            <none>
```

##### 4.3 模拟数据故障操作

```bash
root@k8s-master:~/pod# kubectl delete -f pod-sc-deploy.yaml 
deployment.apps "deploy-pvc-demo" deleted
root@k8s-master:~/pod# kubectl get po
No resources found in default namespace.
```

![](%E5%9B%BE%E7%89%87/minio5.png)

![](%E5%9B%BE%E7%89%87/minio6.png)

##### 4.4 恢复数据

```bash
root@k8s-master:~/pod# velero restore create --from-backup 0730all-bak --wait
Restore request "0730all-bak-20250730153354" submitted successfully.
Waiting for restore to complete. You may safely press ctrl-c to stop waiting - your restore will continue in the background.
 
Restore completed with status: Completed. You may check for more information using the commands `velero restore describe 0730all-bak-20250730153354` and `velero restore logs 0730all-bak-20250730153354`.
```

##### 4.5 验证

```bash
root@k8s-master:~/pod# kubectl get po -o wide
NAME                               READY   STATUS    RESTARTS   AGE   IP             NODE        NOMINATED NODE   READINESS GATES
deploy-pvc-demo-6464949fc4-82r8v   1/1     Running   0          14s   10.100.36.77   k8s-node1   <none>           <none>
deploy-pvc-demo-6464949fc4-mlrn6   1/1     Running   0          14s   10.100.36.76   k8s-node1   <none>           <none>
deploy-pvc-demo-6464949fc4-r5d65   1/1     Running   0          14s   10.100.36.78   k8s-node1   <none>           <none>
root@k8s-master:~/pod# curl 10.100.36.77
Wed, 30 Jul 2025 15:33:56 +0800
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-82r8v -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:33 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:33 index.html
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-mlrn6 -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:33 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:33 index.html
root@k8s-master:~/pod# kubectl exec deploy-pvc-demo-6464949fc4-r5d65 -- ls -lh /usr/share/nginx/html
Defaulted container "c1" out of: c1, init01 (init)
total 75M    
-rw-r--r--    1 root     root       75.0M Jul 30 15:33 haha.txt
-rw-r--r--    1 root     root          32 Jul 30 15:33 index.html
```

**四、Velero 常用操作实战**
-------------------

#### 1\. 创建备份

*   备份整个集群（不含 PV）：

```bash
velero backup create full-cluster-backup
```

*   备份指定命名空间（如 prod）并包含 PV：

```bash
velero backup create prod-backup \  --include-namespaces prod \  --snapshot-volumes=true \  --volume-snapshot-locations ceph-rbd
```

*   按标签筛选资源备份（如 label=app:nginx）

```bash
velero backup create nginx-backup --selector app=nginx
```

#### 2\. 查看备份状态

```bash
velero backup get  # 列出所有备份velero backup describe prod-backup --details  # 查看备份详情
```

#### 3\. 恢复操作

*   从 prod-backup 恢复所有资源：

```bash
velero restore create --from-backup prod-backup
```

*   恢复时排除某些资源（如 Jobs）：

```bash
velero restore create --from-backup prod-backup \  --exclude-resources jobs.batch
```

*   恢复到新集群（需在新集群安装 Velero 并指向同一 BSL）：

```bash
velero restore create --from-backup prod-backup --namespace-mappings prod:prod-new  # 可选：映射命名空间
```

#### 4\. 删除备份

```bash
velero backup delete prod-backup  # 删除备份（默认保留快照，需添加--delete-snapshots=all删除快照）
```

**五、高级功能与最佳实践**
---------------

#### 1\. 定时备份与过期策略

通过`--schedule`参数配置定时备份（支持 cron 表达式），并设置过期时间：

```bash
velero backup create daily-backup \  --schedule "0 3 * * *" \  # 每天凌晨3点执行  --ttl 720h \  # 备份保留30天  --include-namespaces all
```

#### 2\. 备份加密

通过`--encryption-key`启用备份数据加密（需提前创建密钥 Secret）：

```sql
velero backup create encrypted-backup \  --encryption-key secret:velero/backup-encryption-key
```

#### 3\. 跨集群迁移

利用 Velero 实现集群迁移的核心步骤：

1.  在源集群创建全量备份（含 PV 快照）。
2.  在目标集群部署 Velero，指向同一 BSL 和 VSL。
3.  在目标集群执行恢复，自动重建资源和 PV。

#### 4\. 最佳实践建议

*   **定期测试恢复**：每月至少执行一次恢复测试，验证备份有效性。
*   **分层存储备份**：关键数据备份至异地存储，避免单点故障。
*   **最小权限原则**：限制 Velero 服务账号权限，仅授予备份所需的 RBAC 权限。
*   **监控备份状态**：通过 Prometheus+Grafana 监控 Velero 指标（如`velero_backup_total`、`velero_restore_failures`）。

**六、常见问题与 Troubleshooting**
---------------------------

#### 1. 备份卡住 / 失败：

*   检查 Velero pod 日志：`kubectl logs -n velero <velero-pod> -f`
*   排查存储权限：确保 BSL/VSL 的访问密钥有效，网络可通。

#### 2. 恢复后资源状态异常：

*   检查资源依赖关系（如 ConfigMap 未恢复导致 Pod 启动失败），可分阶段恢复。
*   部分资源（如 EndpointSlice）可能需重新创建，Velero 不保证 100% 兼容所有 CRD。

#### 3. 卷快照失败：

*   确认底层存储支持快照（如 Ceph 需开启 RBD 快照功能）。
*   检查 StorageClass 配置：`kubectl describe sc <storageclass>`

