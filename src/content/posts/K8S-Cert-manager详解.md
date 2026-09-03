---
title: K8S-Cert-manager详解
slug: K8S-Cert-manager详解
published: 2025-11-20
description: cert manager 是一个云原生证书管理开源项目，为 Kubernetes 或 OpenShift 集群中的工作负载创建 TLS 证书 并在证书过期之前续订证书。支持多类免费证书机构的证书签发：比如我们刚才提及的Let’s Encrypt以及HashiCorp Vault等机构。
image: '/images/posts/cert-manager.png'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、关于Let’s encrypt（ACME）

```
为了在我们的网站上启用 HTTPS，我们需要从证书颁发机构（CA）获取证书（一种文件），或者从公有云方面申请证书，再将证书部署到我们的网站上面来。Let’s Encrypt 正是其中一家CA证书颁发机构，它可以实现上面所述的过程，一般来说这个过程可以通过一些脚本来进行操作， 但需要支持ACME 协议才行否则是签发不下来的
```

### 二、关于cert-manager

cert-manager 是一个云原生证书管理开源项目，为 Kubernetes 或 OpenShift 集群中的工作负载创建 TLS 证书 并在证书过期之前续订证书。支持多类免费证书机构的证书签发：比如我们刚才提及的Let’s Encrypt以及HashiCorp Vault等机构。

```
官方文档：https://cert-manager.io/docs/
```

它的工作逻辑基本分为以下五部曲：

```
1、创建ClusterIssuer或者Issuer资源用于创建颁发者，决定cert-manager签发证书的方式，然后会在cert-manager上的namespace下生成该颁发者的secret用于证书申请的准备。

2、通过创建Certificate资源来告知cert-manager ：在哪个namespace生成证书、需要签发的域名的证书名称，域名对应的secret资源，以及的引用ClusterIssuer或者Issuer资源等等信息。

3、cert-manager拿着创建好的Certificate资源与ClusterIssuer或者Issuer资源的secret通过内部或外部的webhook向所支持的域名服务提供商对域名进行解析，这里会发起certificaterequests与challenges动作。

4、解析通过acme校验后将证书返回至cert-manager，certificatere对应项会变成True验证通过状态，再将证书转换到对应namespace下的secret资源做证书引用准备。

5、在Ingress-controller上生成ingress资源引用该证书secret即可实现https可信访问。
```

![](/images/posts/cert-manager.png)

**HTTP-01 校验原理**

```
HTTP-01 的校验原理是给你域名指向的 HTTP 服务增加一个临时 location ，Let’s Encrypt 会发送 http 请求到 http:///.well-known/acme-challenge/，YOUR_DOMAIN 就是被校验的域名，TOKEN 是 ACME 协议的客户端负责放置的文件，在这里 ACME 客户端就是 cert-manager，它通过修改或创建 Ingress 规则来增加这个临时校验路径并指向提供 TOKEN 的服务。Let’s Encrypt 会对比 TOKEN 是否符合预期，校验成功后就会颁发证书。此方法仅适用于给使用 Ingress 暴露流量的服务颁发证书，并且不支持泛域名证书。
```

**DNS-01 校验原理**

```
DNS-01 的校验原理是利用 DNS 提供商的 API Key 拿到你的 DNS 控制权限， 在 Let’s Encrypt 为 ACME 客户端提供令牌后，ACME 客户端 (cert-manager) 将创建从该令牌和您的帐户密钥派生的 TXT 记录，并将该记录放在 _acme-challenge.。 然后 Let’s Encrypt 将向 DNS 系统查询该记录，如果找到匹配项，就可以颁发证书。此方法不需要你的服务使用 Ingress，并且支持泛域名证书。
```

### 三、cert-manager部署

#### 1、部署cert-manager和webhook

##### 1.1、添加Jestack Helm存储库并安装cert-manager

```
# 创建命名空间
kubectl create namespace cert-manager

# 添加资源库，更新资源库
helm repo add jetstack https://charts.jetstack.io
helm repo update

# 安装cert-manager
helm upgrade --install cert-manager jetstack/cert-manager --namespace cert-manager --set installCRDs=true
```

##### 1.2、安装webhook

```
# 安装webhook，这里一定记得要和cert-manager安装到同一个命名空间下
helm upgrade --install alidns-webhook alidns-webhook --repo https://wjiec.github.io/alidns-webhook \
--namespace cert-manager --set groupName=acme.yourcompany.com
```

#### 2、申请Accesskey-ID

##### 2.1、RAM授权

在阿里域名所在的主账号下创建一个阿里ram账号，并具有管理DNS的权限，允许控制台登录。

##### 2.2、验证ram账号

登录创建的ram账号，输入我们定义好的账号密码等信息，点击下一步，如果能成功登录那就说明RAM账号有效

##### 2.3、生成Accesskey-ID

鼠标移动到用户头像，在头像下方菜单列表选择“AccessKey管理”，然后点击“创建AccessKey”，记录好生成的“Accesskey-ID”与“Secret Key”到安全的地方。

#### 3、创建证书颁发机构

##### 3.1、Accesskey-ID信息转码

由于kubernetes的secret资源是以加密方式存储，所以这里我们需要将“Accesskey-ID”这些信息进行转码，然后创建对应的secret资源，作为证书办法机构申请的钥匙。

```
# 加密格式
## 这里注意：生成的加密字符串需要去除“Cg==”字符串，这个字符串含义是换行符;
如果传入该换行符将可能导致秘钥验证不通过。
echo "Accesskey-ID" |base64
xxxxxxxCg==
```

##### 3.2、创建证书办法机构密钥对

```
# alidns-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: alidns-secret
  namespace: cert-manager
data:
  access-key-id: TFRBSTV0S3JUQW1SeWxxxxxxx 
  access-key-secret: ZUtSOE5NTnQ0Nxxxxxxx
## 这里将上步骤转化来的加密字符串分别填入对应的位置就可以，声明在命名空间cert-manager
```

##### 3.3、创建证书颁发机构

```
# clusterissuer.yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: 1256581633@qq.com
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod
    solvers:
    - dns01:
        webhook:
         groupName: acme.yourcompany.com
         solverName: alidns
         config:
          region: ""
          accessKeyIdRef:
            name: alidns-secret
            key: access-key-id
          accessKeySecretRef:
            name: alidns-secret
            key: access-key-secret

## 这里需要注意
1、email处可以填写为自己的企业邮箱，主要用于证书过期时候的提醒
2、这里我声明的是ClusterIssuer，这样意味着这个机构对kubernetes的全局命名空间都生效；
此外privateKeySecretRef一定要与name值相同，这样确保后续生成的secret资源绑定。
3、顺便一提，前期我们测试证书签发的时候server建议填写下述地址
- https://acme-staging-v02.api.letsencrypt.org/directory
主要用于验证操作，如果没有问题就可以切到yaml文件所声明的地址
```

#### 4、创建证书

```
# ssl-cert-test.yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: cert-test-ssl
  namespace: cert-manager
spec:
  secretName: cert-test-ssl-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
  - certssl.xxxxxx.cn

## 这里需要注意
1、为了测试方便我将后续前端服务交付至cert-manager所在的cert-manager命名空间下；
所以namespace也是和颁发机构是相同的

2、“issuerRef”是用来与证书办法机构绑定的，说白了就是走哪种签发证书机构去申请证书。
3、“secretName”值一定要记住，以便用于前端服务的ingress引用。
4、“dnsNames”是写需要对哪个域名进行签发证书操作
```

#### 5、生效上述配置

```
[root@core ssl-cert-tools]# kubectl apply -f .
```

此时，我们的cert-manager与webhook程序就证书签发进行自动化操作阶段，也称为所谓的“挑战”阶段，即acem与域名服务提供商进行域名验证+证书签发。

这里观察webhook日志，这里我们发现webhook程序已经拿着我们的证书颁发机构的secret身份令牌去请求阿里的DNS域名解析接口去进行解析记录的“创建”与“删除”的操作。

    [root@core ssl-cert-tools]# kubectl logs -f -n cert-manager alidns-alidns-webhook-7b56577747-5g46c 
    I0410 05:21:45.390934       1 requestheader_controller.go:169] Starting RequestHeaderAuthRequestController
    I0410 05:21:45.390989       1 shared_informer.go:240] Waiting for caches to sync for RequestHeaderAuthRequestController
    I0410 05:21:45.391027       1 configmap_cafile_content.go:202] Starting client-ca::kube-system::extension-apiserver-authentication::client-ca-file
    I0410 05:21:45.391031       1 shared_informer.go:240] Waiting for caches to sync for client-ca::kube-system::extension-apiserver-authentication::client-ca-file
    I0410 05:21:45.391057       1 configmap_cafile_content.go:202] Starting client-ca::kube-system::extension-apiserver-authentication::requestheader-client-ca-file
    I0410 05:21:45.391062       1 shared_informer.go:240] Waiting for caches to sync for client-ca::kube-system::extension-apiserver-authentication::requestheader-client-ca-file
    I0410 05:21:45.391485       1 secure_serving.go:197] Serving securely on [::]:443
    I0410 05:21:45.391992       1 dynamic_serving_content.go:130] Starting serving-cert::/tls/tls.crt::/tls/tls.key
    I0410 05:21:45.392101       1 tlsconfig.go:240] Starting DynamicServingCertificateController
    I0410 05:21:45.491108       1 shared_informer.go:247] Caches are synced for client-ca::kube-system::extension-apiserver-authentication::requestheader-client-ca-file 
    I0410 05:21:45.491108       1 shared_informer.go:247] Caches are synced for RequestHeaderAuthRequestController 
    I0410 05:21:45.491147       1 shared_informer.go:247] Caches are synced for client-ca::kube-system::extension-apiserver-authentication::client-ca-file 
    Decoded configuration: {{{alidns-secret} access-key-id} {{alidns-secret} access-key-secret} }
    I0410 05:22:39.090081       1 trace.go:205] Trace[395976000]: "Create" url:/apis/example.com/v1alpha1/alidns,user-agent:cert-manager-challenges/v1.14.4 (linux/amd64) cert-manager/f5ddc412723722518f401f9ce6ec6fc950e72c04,client:172.16.0.237 (10-Apr-2024 05:22:37.670) (total time: 1419ms):
    Trace[395976000]: ---"Object stored in database" 1418ms (05:22:00.089)
    Trace[395976000]: [1.419366217s] [1.419366217s] END
    I0410 05:23:47.434521       1 trace.go:205] Trace[1810118401]: "Create" url:/apis/example.com/v1alpha1/alidns,user-agent:cert-manager-challenges/v1.14.4 (linux/amd64) cert-manager/f5ddc412723722518f401f9ce6ec6fc950e72c04,client:172.16.0.237 (10-Apr-2024 05:23:45.071) (total time: 2362ms):
    Trace[1810118401]: ---"Object stored in database" 2362ms (05:23:00.434)
    Trace[1810118401]: [2.362668424s] [2.362668424s] END

同时观察certificate资源，发现对应证书已经签发成功。

PS：“READY”处已经为“True”

```
[root@core ssl-cert-tools]# kubectl get certificate -A
NAMESPACE      NAME                                READY   SECRET                              AGE
cert-manager   cert-test-ssl                       True    cert-test-ssl-tls
```

#### 6、发布前端服务+配置ingress

##### 6.1、创建web业务

```
# test-deploy-ssl.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: test-end
  namespace: cert-manager
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: test-end
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: test-end
    spec:
      containers:
      - image: nginx
        imagePullPolicy: Always
        name: test-end
        ports:
        - containerPort: 80
          protocol: TCP
        resources: {}
      restartPolicy: Always
---
apiVersion: v1
kind: Service
metadata:
  name: test-end
  namespace: cert-manager
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    app: test-end
  type: ClusterIP
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: test-end
  namespace: cert-manager
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    # 开启强制跳转https
    nginx.ingress.kubernetes.io/force-ssl-redirect: 'true'
spec:
  # 配置tls证书
  tls:
    - hosts:
      # 写入业务域名
      - certssl.xxxxxx.cn
      # 写入创建Certificate定义的“secretName”
      secretName: cert-test-ssl-tls 
  ingressClassName: nginx
  rules:
  - host: certssl.xxxxxx.cn
    http:
      paths:
      - backend:
          service:
            name: test-end
            port:
              number: 80
        path: /
        pathType: Prefix
```

##### 6.2、生效配置

```
[root@core ssl-cert-tools]# kubectl apply -f .
```

#### 7、自签证书使用

##### 7.1、创建自签证书颁发者

```
# 创建对象
kubectl apply -f - <<EOF
---
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: selfsigned-issuer
  namespace: default                 # 指定 Namespace
spec:
  selfSigned: {}
---
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: selfsigned-cluster-issuer
spec:
  selfSigned: {}
EOF
 
🔔 Issuer 类型资源对象仅作用于集群内单个指定的命名空间
🔔 ClusterIssuer 类型资源对象可以作用于集群内所有的命名空间
 
# 查看对象
kubectl get issuer
kubectl get clusterissuer
```

##### 7.2、创建自签证书

```
# 创建对象
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: selfsigned-cert
  namespace: default
spec:
  dnsNames:
  - example.com
  secretName: selfsigned-cert-tls
  issuerRef:
    name: selfsigned-issuer
EOF
 
🔔 会自动创建 selfsigned-cert 和 selfsigned-secret 对象
 
# 查看对象
kubectl get cert
kubectl get secret
```

##### 7.3、创建 CA 证书

```
# 前提条件：创建自签证书颁发者
 
# 创建 CA 证书对象
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ca-clusterissuer-cert
  namespace: default                 # 指定 namespace
spec:
  isCA: true
  commonName: demo_SelfsignedCa
  secretName: ca-clusterissuer-secret
  privateKey:
    algorithm: ECDSA
    size: 256
  issuerRef:
    name: selfsigned-cluster-issuer
    kind: ClusterIssuer
    group: cert-manager.io
EOF
 
# 查看 CA 证书对象
kubectl get cert
kubectl get secret
```

##### 7.4、创建 CA 证书颁发者

```
# 创建对象
kubectl apply -f - <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: ca-cluster-issuer
spec:
  ca:
    secretName: ca-clusterissuer-secret
EOF
 
# 查看对象
kubectl get clusterissuer
```

### 四、cert-manager故障排除

```
官方文档：https://cert-manager.k8s.ac.cn/docs/troubleshooting/
```

cert-manager 的请求流程

```
(  +---------+  )
  (  | Ingress |  ) Optional                                              ACME Only!
  (  +---------+  )
         |                                                     |
         |   +-------------+      +--------------------+       |  +-------+       +-----------+
         |-> | Certificate |----> | CertificateRequest | ----> |  | Order | ----> | Challenge |
             +-------------+      +--------------------+       |  +-------+       +-----------+
                                                               |
```

