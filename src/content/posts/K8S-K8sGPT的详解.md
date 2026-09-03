---
title: K8S-K8sGPT的详解
slug: K8S-K8sGPT的详解
published: 2025-11-07
description: K8sGPT Github 地址
image: '../../assets/images/Dota-img/muerta.png'
tags:
  - kubernetes
category: 云原生
draft: false
lang: zh-CN
pinned: false
comment: true
---
### 一、介绍

[K8sGPT Github 地址](https://github.com/k8sgpt-ai/k8sgpt)

K8sGPT是一款基于 AI 的 Kubernetes 智能诊断工具，自动扫描集群异常并通过 AI 生成解决方案。它支持多类 AI 后端（OpenAI、本地模型等），提供两种核心使用模式：  

- Cli 方式安装：安装 cli 工具方式使用,通过 kubeconfig 连接集群，即时诊断问题
- Operator 方式安装：通过在集群中安装 Operator 方式使用，这种方式非常适合**持续监控集群**，并且可以与 Prometheus 和 Alertmanager 等现有监控集成

在 k8s 环境部署，推荐使用 Operator 方式安装。

### 二、**Cli 方式安装**

#### **2.1 安装**

k8sgpt 的能力由 cli 工具提供，可以直接使用 brew 安装：

```
brew install k8sgpt
```

或者到 [Releases](https://github.com/k8sgpt-ai/k8sgpt/releases) 界面下载

```
version=v0.4.20

wget https://github.com/k8sgpt-ai/k8sgpt/releases/download/${version}/k8sgpt_Linux_x86_64.tar.gz

tar -zxvf k8sgpt_Linux_x86_64.tar.gz
mv k8sgpt /usr/local/bin/

# 查看版本
k8sgpt version
```

#### 2.2 配置 AI Provider

k8sgpt 支持多种 AI Provider，具体如下：

```
[root@kc-master ~]# k8sgpt auth list
Default:
> openai
Active:
Unused:
> localai
> openai
> ollama
> azureopenai
> cohere
> amazonbedrock
> amazonsagemaker
> google
> noopai
> huggingface
> googlevertexai
> oci
> customrest
> ibmwatsonxai
```

常见的 openai、ollama 等，也支持使用 localai 对接任意满足 OpenAI API 格式的外部模型。

这里我们使用 localai Provider 来对接 DeepSeek：

```bash
baseurl=https://api.deepseek.com/v1
model=deepseek-reasoner
key=sk-xxx

k8sgpt auth add -b localai -u $baseurl -m $model -p $key
```

并将其设置为 默认 Provider

```
$ k8sgpt auth default -p localai
Default provider set to localai
```

#### 2.3 测试诊断

部署创建带错误的 deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
        securityContext:
          readOnlyRootFilesystem: true
```

```bash
# 部署
kubectl apply -f ./nignx.yaml -n demo
# 诊断
k8sgpt analyze --explain
```

![在这里插入图片描述](/images/posts/k8sgpt-1.png)

指定 kubeconfig 访问远程集群

```
k8sgpt analyze --kubeconfig mykubeconfig
```

#### 2.4 安全扫描分析

```bash
k8sgpt integration list
k8sgpt integration activate trivy
k8sgpt filters list
k8sgpt analyse --filter=VulnerabilityReport
k8sgpt analyze --filter VulnerabilityReport --explain --backend localai

k8sgpt integration deactivate trivy
```

### 三、Operator 使用

#### 3.1 部署 operator

```bash
helm repo add k8sgpt https://charts.k8sgpt.ai/
helm repo update
helm pull k8sgpt/k8sgpt-operator
tar xvf k8sgpt-operator-0.1.0.tgz
cd k8sgpt-operator && vim values.yaml
# 开启 serviceMonitor 和 GrafanaDashboard
serviceMonitor:
	enabled: true
GrafanaDashboard:
	enabled: true
helm install k8sgpt-operator . -n k8sgpt-operator-system --create-namespace
```

#### 3.2 部署 promethues

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prom prometheus-community/kube-prometheus-stack -n k8sgpt-operator-system --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false
kubectl port-forward service/prom-grafana -n k8sgpt-operator-system 3000:80
```

#### 3.3 配置部署 K8sGPT

```bash
kubectl apply -f -n k8sgpt-operator-system - << EOF
apiVersion: core.k8sgpt.ai/v1alpha1
kind: K8sGPT
metadata:
  name: k8sgpt-local-ai
  namespace: k8sgpt-operator-system
spec:
  ai:
    enabled: true
    model: Qwen3-8B
    backend: localai
    baseUrl: http://192.168.1.193:9998/v1
    language: Chinese
  analysis:
    interval: "5m"      
  noCache: false
  repository: ghcr.io/k8sgpt-ai/k8sgpt
  version: v0.4.1
EOF
```

#### 3.4 查看故障报告

```bash
 kubectl get -n k8sgpt-operator-system result k8sgptoperatorsystemnginxdeployment866dc6df9cn5qqj -o yaml
```

#### 3.5 Grafana 查看对应面板

![在这里插入图片描述](/images/posts/k8sgpt-2.png)

备注：登陆的账号密码可以查看 secret/prom-grafana

### 四、工作流程

#### **4.1 完整流程**

分为以下步骤：

- 1）初始化 Analysis：配置 Kubernetes 客户端、AI 后端等等
- 2）运行 Analysis
  - 运行自定义 Analysis（如果有配置）
  - 运行内置 Analysis
- 3）请求 AI 生成处理方案(如果指定 explain)
- 4）结构化返回诊断报告

完整代码如下：

[analyze.go#L11-L67](https://github.com/k8sgpt-ai/k8sgpt/blob/main/pkg/server/analyze/analyze.go#L11-L67)

```go
func (h *Handler) Analyze(ctx context.Context, i *schemav1.AnalyzeRequest) (
    *schemav1.AnalyzeResponse,
    error,
) {
    if i.Output == "" {
       i.Output = "json"
    }

    if int(i.MaxConcurrency) == 0 {
       i.MaxConcurrency = 10
    }
   
    // 初始化 Analysis
    config, err := analysis.NewAnalysis(
       i.Backend,
       i.Language,
       i.Filters,
       i.Namespace,
       i.LabelSelector,
       i.Nocache,
       i.Explain,
       int(i.MaxConcurrency),
       false,      // Kubernetes Doc disabled in server mode
       false,      // Interactive mode disabled in server mode
       []string{}, //TODO: add custom http headers in server mode
       false,      // with stats disable
    )
    if err != nil {
       return &schemav1.AnalyzeResponse{}, err
    }
    config.Context = ctx // Replace context for correct timeouts.
    defer config.Close()

    // 运行自定义 Analysis
    if config.CustomAnalyzersAreAvailable() {
       config.RunCustomAnalysis()
    }
    // 运行内置 Analysis
    config.RunAnalysis()

    // 请求 AI 生成处理方案(如果指定 explain)
    if i.Explain {
       err := config.GetAIResults(i.Output, i.Anonymize)
       if err != nil {
          return &schemav1.AnalyzeResponse{}, err
       }
    }

    // 结构化返回诊断报告
    out, err := config.PrintOutput(i.Output)
    if err != nil {
       return &schemav1.AnalyzeResponse{}, err
    }
    var obj schemav1.AnalyzeResponse

    err = json.Unmarshal(out, &obj)
    if err != nil {
       return &schemav1.AnalyzeResponse{}, err
    }

    return &obj, nil
}
```

#### 4.2 Analyzer 工作逻辑

k8sgpt 中包括多个[内置 Analyzer](https://github.com/k8sgpt-ai/k8sgpt/tree/main/pkg/analyzer)

以 Pod Analyzer 为例，流程也比较简单：

- 1）使用 k8s client 获取 Pod 列表
- 2）然后遍历检查每个 Pod 的状态,获取错误信息
- 3）最终将错误信息结构化为 Result 格式返回

完整代码如下：

```go
func (PodAnalyzer) Analyze(a common.Analyzer) ([]common.Result, error) {

    kind := "Pod"
   
    AnalyzerErrorsMetric.DeletePartialMatch(map[string]string{
       "analyzer_name": kind,
    })

    // search all namespaces for pods that are not running
    list, err := a.Client.GetClient().CoreV1().Pods(a.Namespace).List(a.Context, metav1.ListOptions{
       LabelSelector: a.LabelSelector,
    })
    if err != nil {
       return nil, err
    }
    var preAnalysis = map[string]common.PreAnalysis{}

    for _, pod := range list.Items {
       var failures []common.Failure

       // Check for pending pods
       if pod.Status.Phase == "Pending" {
          // Check through container status to check for crashes
          for _, containerStatus := range pod.Status.Conditions {
             if containerStatus.Type == v1.PodScheduled && containerStatus.Reason == "Unschedulable" {
                if containerStatus.Message != "" {
                   failures = append(failures, common.Failure{
                      Text:      containerStatus.Message,
                      Sensitive: []common.Sensitive{},
                   })
                }
             }
          }
       }

       // Check for errors in the init containers.
       failures = append(failures, analyzeContainerStatusFailures(a, pod.Status.InitContainerStatuses, pod.Name, pod.Namespace, string(pod.Status.Phase))...)

       // Check for errors in containers.
       failures = append(failures, analyzeContainerStatusFailures(a, pod.Status.ContainerStatuses, pod.Name, pod.Namespace, string(pod.Status.Phase))...)

       if len(failures) > 0 {
          preAnalysis[fmt.Sprintf("%s/%s", pod.Namespace, pod.Name)] = common.PreAnalysis{
             Pod:            pod,
             FailureDetails: failures,
          }
          AnalyzerErrorsMetric.WithLabelValues(kind, pod.Name, pod.Namespace).Set(float64(len(failures)))
       }
    }

    for key, value := range preAnalysis {
       var currentAnalysis = common.Result{
          Kind:  kind,
          Name:  key,
          Error: value.FailureDetails,
       }

       parent, found := util.GetParent(a.Client, value.Pod.ObjectMeta)
       if found {
          currentAnalysis.ParentObject = parent
       }
       a.Results = append(a.Results, currentAnalysis)
    }

    return a.Results, nil
}
```

#### **4.3 Prompt 模板与 AI 交互**

在上一步 k8sgpt 拿到了集群中的异常信息，例如：

```
Back-off pulling image "nginx:invalid-tag"
```

接下来就拿这个错误信息给 AI 生成解决方案，这里k8sgpt 用到的 prompt 模板如下：

[prompts.go#L4-L16](https://github.com/k8sgpt-ai/k8sgpt/blob/main/pkg/ai/prompts.go#L4-L16)

以下是用于处理 Kubernetes 错误的 Prompt 模板：

```
default_prompt = `Simplify the following Kubernetes error message delimited by triple dashes written in --- %s --- language; --- %s ---.
Provide the most possible solution in a step by step style in no more than 280 characters. Write the output in the following format:
Error: {Explain error here}
Solution: {Step by step solution here}
```

这也是为什么我们看到的 Result 中的 detail 是这样的：

```
[root@kc-master ~]# kubectl -n k8sgpt-operator-system get result defaultbrokenimage8896f7cf4vf47k -oyaml
apiVersion: core.k8sgpt.ai/v1alpha1
kind: Result
metadata:
  creationTimestamp: "2025-06-26T04:23:06Z"
  generation: 1
  labels:
    k8sgpts.k8sgpt.ai/backend: localai
    k8sgpts.k8sgpt.ai/name: k8sgpt-local-ai
    k8sgpts.k8sgpt.ai/namespace: k8sgpt-operator-system
  name: defaultbrokenimage8896f7cf4vf47k
  namespace: k8sgpt-operator-system
  resourceVersion: "90019"
  uid: 1ab8b2ad-7398-4d6d-bd8b-e2d5beba70ae
spec:
  backend: localai
  details: "Error: Kubernetes cannot pull the container image because the tag \"invalid-tag\"
    doesn't exist in the Docker registry for nginx.  \nSolution:  \n1. Verify valid
    nginx tags at [hub.docker.com/_/nginx](https://hub.docker.com/_/nginx)  \n2. Edit
    your deployment:  \n```bash  \nkubectl edit deployment <deployment-name>  \n```
    \ \n3. Replace `image: nginx:invalid-tag` with a valid tag (e.g., `nginx:latest`
    or `nginx:1.25`)  \n4. Save and exit. Kubernetes will automatically retry pulling
    the new image.  \n\n*(273 characters)*"
  error:
  - text: Back-off pulling image "nginx:invalid-tag"
  kind: Pod
  name: default/broken-image-8896f7cf4-vf47k
  parentObject: ""
status: {}
```

格式化之后

```
Error: Kubernetes cannot pull the container image because the tag "invalid-tag" doesn't exist in the Docker registry for nginx.  

Solution:  
1. Verify valid nginx tags at [hub.docker.com/_/nginx](https://hub.docker.com/_/nginx)  
2. Edit your deployment:  
```bash  
kubectl edit deployment <deployment-name>  
```  
3. Replace `image: nginx:invalid-tag` with a valid tag (e.g., `nginx:latest` or `nginx:1.25`)  
4. Save and exit. Kubernetes will automatically retry pulling the new image.
```

