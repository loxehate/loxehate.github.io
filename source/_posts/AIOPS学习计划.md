---
title: AIOps学习计划
tags: [AIOps]
categories: [职业发展]
date: 2025-05-16
---

---

# 🧭 AIOps 学习计划（12 周）  
 适用于：运维工程师转型 AIOps 方向  
 目标：掌握 Python 编程、构建监控系统、初步实践 AIOps 场景  

---

## 📅 第 1~4 周：编程 & 数据分析能力提升

| 周次  | 学习内容                                                     | 实践任务                                          |
| ----- | ------------------------------------------------------------ | ------------------------------------------------- |
| 第1周 | Python 基础语法回顾（函数、模块、异常处理）Shell 脚本编写技巧 | 写一个自动化备份脚本用 Python 解析日志文件        |
| 第2周 | Python 操作系统与网络操作subprocess、os、re、json、requests  | 写一个调用 API 的脚本获取服务器信息解析 JSON 日志 |
| 第3周 | Pandas 入门：数据读取、清洗、聚合、可视化                    | 分析 nginx 或系统日志，统计访问频率、错误码分布   |
| 第4周 | ELK 套件初探：Elasticsearch、Logstash、Kibana 安装与使用     | 搭建 ELK 收集系统日志并可视化展示                 |

🎯 本周小结目标：
- 能熟练使用 Python 处理日常运维任务
- 能搭建 ELK 平台进行日志收集和分析

---

## 📅 第 5~8 周：监控系统与可观测性建设

| 周次  | 学习内容                                           | 实践任务                                         |
| ----- | -------------------------------------------------- | ------------------------------------------------ |
| 第5周 | Prometheus 基础：安装、配置、exporter 使用         | 搭建 Prometheus + Node Exporter 监控服务器       |
| 第6周 | Grafana 可视化仪表盘构建Alertmanager 告警规则配置  | 创建 CPU/内存/磁盘监控面板<br>设置邮件或钉钉告警 |
| 第7周 | OpenTelemetry 初识：统一采集日志、指标、追踪       | 在本地部署 Otel Collector 收集 traces 和 metrics |
| 第8周 | 服务追踪 Tracing（Jaeger / Tempo）微服务依赖拓扑图 | 模拟微服务请求链路，观察调用延迟和失败点         |

🎯 本周小结目标：
- 能独立搭建监控平台（Prometheus + Grafana）
- 理解可观测性三大支柱：Metrics、Logs、Traces

---

## 📅 第 9~12 周：AIOps 初步实践

| 周次   | 学习内容学习内容                                  | 实践任务实践任务                              |
| ------ | ------------------------------------------------- | --------------------------------------------- |
| 第9周  | 机器学习入门：分类、聚类、回归、异常检测概念      | 用 Scikit-learn 实现简单的时间序列预测        |
| 第10周 | 时间序列异常检测：Prophet、Isolation Forest、LSTM | 对 CPU 使用率做异常检测模型训练               |
| 第11周 | 日志分析 NLP 技术：Log Parsing、Clustering        | 使用 TF-IDF 或 Word2Vec 对日志做聚类          |
| 第12周 | 综合项目实战：搭建一个简易 AIOps 流程             | ELK 收集日志 → Python 异常检测 → 告警通知闭环 |

🎯 本周小结目标：
- 能使用 ML 工具对运维数据做初步智能分析
- 能搭建一个完整的 AIOps 小型实验流程

---

## 🧰 推荐工具清单

| 类别     | 工具                                                  |
| -------- | ----------------------------------------------------- |
| 编程语言 | Python、Shell、SQL                                    |
| 日志系统 | ELK Stack、Fluentd、OpenTelemetry Collector           |
| 监控系统 | Prometheus、Grafana、VictoriaMetrics                  |
| 追踪系统 | Jaeger、Tempo、Zipkin                                 |
| 机器学习 | Scikit-learn、Statsmodels、TensorFlow/PyTorch（可选） |
| 容器化   | Docker、Minikube/Kubernetes（进阶）                   |
| 任务调度 | Airflow、Cron、Ansible                                |

---

## 📁 GitHub 项目结构建议

你可以创建一个名为 `aiops-learning` 的仓库来组织你的学习路径和项目代码：

```bash
aiops-learning
├── week-01
│   └── scripts
│       ├── backup.sh
│       └── parse_logs.py
├── week-02
│   └── api_caller.py
├── week-03
│   └── log_analysis.ipynb
├── week-04
│   └── elasticsearch
│       └── config
├── week-05
│   └── prometheus
│       └── node-exporter-setup.md
├── week-06
│   └── grafana-dashboards
├── week-09
│   └── ml-examples
│       └── time_series_forecast.py
├── week-10
│   └── anomaly_detection
│       └── cpu_usage_isolation_forest.py
├── week-11
│   └── log_nlp
│       └── log_clustering_tfidf.py
├── week-12
│   └── aiops-demo
│       ├── data
│       ├── model
│       ├── alerting
│       └── README.md
├── resources
│   └── books.pdf
└── learning-plan.md
```

---

## 📚 推荐资源汇总

### 📘 书籍推荐：
- 《Python 自动化运维：技术与最佳实践》
- 《时间序列分析与预测》by Box & Jenkins
- 《AIOps实践：构建面向未来的智能运维能力》
- 《Site Reliability Engineering》Google 出品
- 《DevOps A Software Architect’s Perspective》

### 🎥 视频课程：
- [B站 - Prometheus 入门到实战](https://www.bilibili.com)
- [Coursera - Applied Data Science with Python](https://www.coursera.org)
- [CNCF 官方视频（YouTube）](https://www.youtube.comcCloudNativeFdn)

### 💻 开源项目参考：
- [Prometheus + Alertmanager 示例](https://github.comprometheusalertmanager)
- [ELK Docker 部署模板](https://github.comdeviantonydocker-elk)
- [Scikit-learn 示例项目](https://github.comscikit-learnscikit-learn)
- [OpenTelemetry Collector](https://github.comopen-telemetryopentelemetry-collector)
- [keep](https://github.com/loxehate/keep)
- [chaterm](https://github.com/chaterm/chaterm)

---

