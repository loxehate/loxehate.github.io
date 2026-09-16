---
title: LangFuse详解
slug: LangFuse详解
published: 2026-09-16
description: 使用 LangFuse 搭建 LLM 观测平台时，所有追踪数据、提示日志、用户反馈、完全掌控数据流向。
image: '../../assets/images/Dota-img/arc_warden.png'
tags:
  - LangFuse
category: 监控观测
draft: false
lang: zh-CN
pinned: false
comment: true
---

### 一、为什么选择自托管 LangFuse？—— 选型理由

#### 1\. 环境一致性与可移植性

LLM 应用通常运行在复杂的异构环境中（开发机、CI/CD、生产集群），而 LangFuse 官方推荐基于 Docker 容器化 部署 。**Docker 容器化部署** 保证了 LangFuse 实例在任何基础设施上的行为一致，无论是本地 Mac 还是云上 Ubuntu 服务器，只需一条命令即可启动。

这种 **LangFuse 的选型理由** 在团队协作和交付中尤为重要：你不再需要为“我的环境没问题啊”而头疼。

#### 2\. 数据主权与隐私合规

当使用 LangFuse 搭建 LLM 观测平台时，所有追踪数据、提示日志、用户反馈都存储在自己的 PostgreSQL 数据库中。这对于金融、医疗等受监管行业是刚需。自托管意味着你完全掌控数据流向，避免敏感信息通过 SaaS 接口泄露。

#### 3\. 灵活的定制与扩展

开源版本允许你修改前端主题、接入自定义认证、甚至替换后端组件。Docker Compose 部署方式让你能够像搭积木一样组合服务（如 Nginx 反向代理、Redis 缓存），实现高可用架构。

* * *

### 二、实战：Docker 部署 LangFuse（本地/生产）

#### 1\. 环境准备

*   安装 Docker Engine（推荐 24.0+）和 Docker Compose
*   确保系统至少 4GB 内存（参考官方最低要求）
*   克隆 LangFuse 官方仓库（可选，但推荐获取最新 docker-compose.yml）

```bash
# 检查 Docker 版本
docker --version
docker compose version
```

#### 2\. 创建 docker-compose.yml

以下是一个经过 **踩坑记录** 优化的配置文件，包含了必要的环境变量和网络配置。注意：直接使用官方镜像时，国内用户可能需要配置镜像加速器，否则拉取速度极慢。

```yaml
# Make sure to update the credential placeholders with your own secrets.
# We mark them with # CHANGEME in the file below.
# In addition, we recommend to restrict inbound traffic on the host to langfuse-web (port 3000) and minio (port 9090) only.
# All other components are bound to localhost (127.0.0.1) to only accept connections from the local machine.
# External connections from other machines will not be able to reach these services directly.
services:
  langfuse-worker:
    image: docker.io/langfuse/langfuse-worker:3
    restart: always
    depends_on: &langfuse-depends-on
      postgres:
        condition: service_healthy
      clickhouse:
        condition: service_healthy
    ports:
      - 127.0.0.1:3030:3030
    environment: &langfuse-worker-env
      NEXTAUTH_URL: ${NEXTAUTH_URL:-http://localhost:3000}
      DATABASE_URL: ${DATABASE_URL:-postgresql://postgres:postgres@postgres:5432/postgres} # CHANGEME
      SALT: ${SALT:-mysalt} # CHANGEME
      ENCRYPTION_KEY: ${ENCRYPTION_KEY:-0000000000000000000000000000000000000000000000000000000000000000} # CHANGEME: generate via `openssl rand -hex 32`
      TELEMETRY_ENABLED: ${TELEMETRY_ENABLED:-true}
      LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES: ${LANGFUSE_ENABLE_EXPERIMENTAL_FEATURES:-false}
      CLICKHOUSE_MIGRATION_URL: ${CLICKHOUSE_MIGRATION_URL:-clickhouse://clickhouse:9000}
      CLICKHOUSE_URL: ${CLICKHOUSE_URL:-http://clickhouse:8123}
      CLICKHOUSE_USER: ${CLICKHOUSE_USER:-clickhouse}
      CLICKHOUSE_PASSWORD: ${CLICKHOUSE_PASSWORD:-clickhouse} # CHANGEME
      CLICKHOUSE_CLUSTER_ENABLED: ${CLICKHOUSE_CLUSTER_ENABLED:-false}
      LANGFUSE_USE_AZURE_BLOB: ${LANGFUSE_USE_AZURE_BLOB:-false}
      LANGFUSE_USE_OCI_NATIVE_OBJECT_STORAGE: ${LANGFUSE_USE_OCI_NATIVE_OBJECT_STORAGE:-false}
      LANGFUSE_OCI_AUTH_TYPE: ${LANGFUSE_OCI_AUTH_TYPE:-workload_identity}
      LANGFUSE_S3_EVENT_UPLOAD_BUCKET: ${LANGFUSE_S3_EVENT_UPLOAD_BUCKET:-backup-bucket}
      LANGFUSE_S3_EVENT_UPLOAD_REGION: ${LANGFUSE_S3_EVENT_UPLOAD_REGION:-auto}
      LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID: ${LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID:-HPUAW7MKHPX8PMCL05TQ}
      LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY: ${LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY:-lYfJGdkTHRlAxkK8BL4iv67ntggQC1bswCqbo0z3} # CHANGEME
      LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT: ${LANGFUSE_S3_EVENT_UPLOAD_ENDPOINT:-http://obs.cn-north-4.myhuaweicloud.com}
      LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE: ${LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE:-true}
      LANGFUSE_S3_EVENT_UPLOAD_PREFIX: ${LANGFUSE_S3_EVENT_UPLOAD_PREFIX:-langfuse/events/}
      LANGFUSE_S3_MEDIA_UPLOAD_BUCKET: ${LANGFUSE_S3_MEDIA_UPLOAD_BUCKET:-backup-bucket}
      LANGFUSE_S3_MEDIA_UPLOAD_REGION: ${LANGFUSE_S3_MEDIA_UPLOAD_REGION:-auto}
      LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID: ${LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID:-HPUAW7MKHPX8PMCL05TQ}
      LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY: ${LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY:-lYfJGdkTHRlAxkK8BL4iv67ntggQC1bswCqbo0z3} # CHANGEME
      LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT: ${LANGFUSE_S3_MEDIA_UPLOAD_ENDPOINT:-http://obs.cn-north-4.myhuaweicloud.com}
      LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE: ${LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE:-true}
      LANGFUSE_S3_MEDIA_UPLOAD_PREFIX: ${LANGFUSE_S3_MEDIA_UPLOAD_PREFIX:-langfuse/media/}
      LANGFUSE_S3_BATCH_EXPORT_ENABLED: ${LANGFUSE_S3_BATCH_EXPORT_ENABLED:-false}
      LANGFUSE_S3_BATCH_EXPORT_BUCKET: ${LANGFUSE_S3_BATCH_EXPORT_BUCKET:-langfuse}
      LANGFUSE_S3_BATCH_EXPORT_PREFIX: ${LANGFUSE_S3_BATCH_EXPORT_PREFIX:-exports/}
      LANGFUSE_S3_BATCH_EXPORT_REGION: ${LANGFUSE_S3_BATCH_EXPORT_REGION:-auto}
      LANGFUSE_S3_BATCH_EXPORT_ENDPOINT: ${LANGFUSE_S3_BATCH_EXPORT_ENDPOINT:-http://minio:9000}
      LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT: ${LANGFUSE_S3_BATCH_EXPORT_EXTERNAL_ENDPOINT:-http://localhost:9090}
      LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID: ${LANGFUSE_S3_BATCH_EXPORT_ACCESS_KEY_ID:-minio}
      LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY: ${LANGFUSE_S3_BATCH_EXPORT_SECRET_ACCESS_KEY:-miniosecret} # CHANGEME
      LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE: ${LANGFUSE_S3_BATCH_EXPORT_FORCE_PATH_STYLE:-true}
      LANGFUSE_INGESTION_QUEUE_DELAY_MS: ${LANGFUSE_INGESTION_QUEUE_DELAY_MS:-}
      LANGFUSE_INGESTION_CLICKHOUSE_WRITE_INTERVAL_MS: ${LANGFUSE_INGESTION_CLICKHOUSE_WRITE_INTERVAL_MS:-}
      REDIS_HOST: ${REDIS_HOST:-redis}
      REDIS_PORT: ${REDIS_PORT:-6379}
      REDIS_AUTH: ${REDIS_AUTH:-myredissecret} # CHANGEME
      REDIS_TLS_ENABLED: ${REDIS_TLS_ENABLED:-false}
      REDIS_TLS_CA: ${REDIS_TLS_CA:-/certs/ca.crt}
      REDIS_TLS_CERT: ${REDIS_TLS_CERT:-/certs/redis.crt}
      REDIS_TLS_KEY: ${REDIS_TLS_KEY:-/certs/redis.key}
      EMAIL_FROM_ADDRESS: ${EMAIL_FROM_ADDRESS:-}
      SMTP_CONNECTION_URL: ${SMTP_CONNECTION_URL:-}

  langfuse-web:
    image: docker.io/langfuse/langfuse:3
    restart: always
    depends_on: *langfuse-depends-on
    ports:
      - 3000:3000
    environment:
      <<: *langfuse-worker-env
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET:-mysecret} # CHANGEME
      LANGFUSE_INIT_ORG_ID: ${LANGFUSE_INIT_ORG_ID:-}
      LANGFUSE_INIT_ORG_NAME: ${LANGFUSE_INIT_ORG_NAME:-}
      LANGFUSE_INIT_PROJECT_ID: ${LANGFUSE_INIT_PROJECT_ID:-}
      LANGFUSE_INIT_PROJECT_NAME: ${LANGFUSE_INIT_PROJECT_NAME:-}
      LANGFUSE_INIT_PROJECT_PUBLIC_KEY: ${LANGFUSE_INIT_PROJECT_PUBLIC_KEY:-}
      LANGFUSE_INIT_PROJECT_SECRET_KEY: ${LANGFUSE_INIT_PROJECT_SECRET_KEY:-}
      LANGFUSE_INIT_USER_EMAIL: ${LANGFUSE_INIT_USER_EMAIL:-}
      LANGFUSE_INIT_USER_NAME: ${LANGFUSE_INIT_USER_NAME:-}
      LANGFUSE_INIT_USER_PASSWORD: ${LANGFUSE_INIT_USER_PASSWORD:-}

  clickhouse:
    image: docker.io/clickhouse/clickhouse-server
    restart: always
    user: "101:101"
    environment:
      CLICKHOUSE_DB: default
      CLICKHOUSE_USER: ${CLICKHOUSE_USER:-clickhouse}
      CLICKHOUSE_PASSWORD: ${CLICKHOUSE_PASSWORD:-clickhouse} # CHANGEME
    volumes:
      - ./langfuse_clickhouse_data:/var/lib/clickhouse
      - ./langfuse_clickhouse_logs:/var/log/clickhouse-server
      - ./logs.xml:/etc/clickhouse-server/config.d/logs.xml
    ports:
      - 127.0.0.1:8123:8123
      - 127.0.0.1:9000:9000
    healthcheck:
      test: wget --no-verbose --tries=1 --spider http://localhost:8123/ping || exit 1
      interval: 5s
      timeout: 5s
      retries: 10
      start_period: 1s



  postgres:
    image: docker.io/postgres:${POSTGRES_VERSION:-17}
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 3s
      timeout: 3s
      retries: 10
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres} # CHANGEME
      POSTGRES_DB: ${POSTGRES_DB:-postgres}
      TZ: UTC
      PGTZ: UTC
    ports:
      - 127.0.0.1:5432:5432
    volumes:
      - ./langfuse_postgres_data:/var/lib/postgresql/data

#volumes:
#  langfuse_postgres_data:
#    driver: local
#  langfuse_clickhouse_data:
#    driver: local
#  langfuse_clickhouse_logs:
#    driver: local
```

#### 3\. 启动应用

在 docker-compose.yml 所在目录执行：

```bash
# 可选：设置环境变量（或直接写入 .env 文件）
export DB_PASSWORD=strong-password
export NEXTAUTH_URL=http://your-server-ip:3000
export LANGFUSE_SECRET_KEY=your-secret

# 启动所有服务
docker compose up -d

# 查看日志
docker compose logs -f langfuse
```

当看到类似 `Listening on http://0.0.0.0:3000` 的日志时，说明服务启动成功。访问 `http://localhost:3000` 即可进入 LangFuse 管理界面。

#### 4\. 验证健康状态

LangFuse 提供了健康检查端点：

```bash
curl http://localhost:3000/api/health
# 返回 {"status":"ok"}
```

* * *

### 三、常用配置详解与踩坑记录

#### 1、常用配置代码示例（ Python 模拟）

虽然 LangFuse 本身是 Node.js 应用，但你可以通过环境变量统一管理配置。以下 Python 片段展示了如何将这些变量映射到 Docker Compose 中：

```python
import os

def print_langfuse_config():
    config = {
        "NEXTAUTH_URL": os.getenv("NEXTAUTH_URL", "http://localhost:3000"),
        "DATABASE_URL": os.getenv("DATABASE_URL", "postgresql://langfuse:password@postgres:5432/langfuse"),
        "LANGFUSE_SECRET_KEY": os.getenv("LANGFUSE_SECRET_KEY", "my-secret-key"),
        "NEXTAUTH_SECRET": os.getenv("NEXTAUTH_SECRET", "nextauth-secret"),
    }
    print("=== LangFuse 常用配置 ===")
    for key, val in config.items():
        print(f"{key}: {val}")

print_langfuse_config()
```

**核心环境变量说明：**

| 变量名 | 作用 | 示例值 | 是否必填 |
| --- | --- | --- | --- |
| `DATABASE_URL` | PostgreSQL 连接字符串 | `postgresql://user:pass@host:5432/dbname` | 是 |
| `NEXTAUTH_URL` | 应用访问地址（用于认证回调） | `http://你的域名或IP:3000` | 是 |
| `NEXTAUTH_SECRET` | NextAuth 的加密密钥 | 随机字符串（建议使用 `openssl rand -base64 32` 生成） | 推荐 |
| `LANGFUSE_SECRET_KEY` | 内部 API 加密密钥 | 随机字符串 | 推荐 |
| `LANGFUSE_ENABLE_EXPERIMENTAL` | 启用实验性功能 | `true` 或 `false` | 否 |

#### 2、优化自托管 Langfuse 的 ClickHouse 资源占用

 ClickHouse CPU 占用较高，磁盘持续写入较高，通过如下命令发现，大部分磁盘占用都是 `trace_log` 表造成的：

```
SELECT table, formatReadableSize(size) as size, rows FROM (
    SELECT
        table,
        database,
        sum(bytes) AS size,
        sum(rows) AS rows
    FROM system.parts
    WHERE active
    GROUP BY table, database
    ORDER BY size DESC
)
```

关闭各种 trace 日志，来减少 ClickHouse 的资源占用

logs.xml

```
<clickhouse>
    <profiles>
        <default>
            <log_queries>0</log_queries>
            <log_query_threads>0</log_query_threads>
        </default>
    </profiles>
    <logger>
        <level>warning</level>
        <console>true</console>
    </logger>
    <asynchronous_metric_log remove="1" />
    <backup_log remove="1" />
    <error_log remove="1" />
    <metric_log remove="1" />
    <query_thread_log remove="1" />
    <query_log remove="1" />
    <query_views_log remove="1" />
    <part_log remove="1" />
    <session_log remove="1" />
    <text_log remove="1" />
    <trace_log remove="1" />
    <crash_log remove="1" />
    <opentelemetry_span_log remove="1" />
    <zookeeper_log remove="1" />
    <processors_profile_log remove="1" />
    <background_schedule_pool_log remove="1" />
</clickhouse>
```

配置挂载到 ClickHouse 容器的 `/etc/clickhouse-server/config.d/logs.xml` 后，重启容器即可

#### 3、跟踪traces生命周期管理

/usr/local/src/cleanup_langfuse.sh

```
#!/usr/bin/env bash

########################################
# Langfuse Config
########################################

HOST="http://127.0.0.1:3000"

PUBLIC_KEY="sk-lf-874cf554-f528-44e9-"
SECRET_KEY="pk-lf-1e57be2f-dc46-480e-"

########################################
# Retention Config
########################################

# 保留天数
KEEP_DAYS=7

# 查询分页大小（Langfuse 最大100）
LIMIT=100

# 每次删除数量
DELETE_BATCH=50

# 删除间隔（秒）
SLEEP_SECONDS=1

########################################
# Generate cutoff timestamp
########################################

CUTOFF=$(date -u -d "${KEEP_DAYS} days ago" +"%Y-%m-%dT%H:%M:%S.000Z")

echo "=================================================="
echo "Langfuse Trace Cleanup"
echo "=================================================="
echo "Host         : ${HOST}"
echo "Keep Days    : ${KEEP_DAYS}"
echo "Cutoff Time  : ${CUTOFF}"
echo "Limit        : ${LIMIT}"
echo "Delete Batch : ${DELETE_BATCH}"
echo "=================================================="

PAGE=1

while true; do

  echo ""
  echo ">>> Fetch page ${PAGE}"

  RESPONSE=$(curl -s \
    -u "${PUBLIC_KEY}:${SECRET_KEY}" \
    "${HOST}/api/public/traces?limit=${LIMIT}&page=${PAGE}&orderBy=timestamp.asc&toTimestamp=${CUTOFF}")

  # 清理非法控制字符
  CLEAN_RESPONSE=$(printf '%s' "$RESPONSE" | tr -d '\000-\031')

  IDS=$(printf '%s' "$CLEAN_RESPONSE" \
    | jq -r '.data[].id' 2>/dev/null || true)

  COUNT=$(printf '%s\n' "$IDS" | grep -c . || true)

  echo "Found ${COUNT} expired traces"

  if [ "${COUNT}" -eq 0 ]; then
    echo "No more expired traces"
    break
  fi

  TMP_FILE=$(mktemp)

  printf '%s\n' "$IDS" > "$TMP_FILE"

  while true; do

    BATCH=$(head -n ${DELETE_BATCH} "$TMP_FILE")

    if [ -z "$BATCH" ]; then
      break
    fi

    JSON=$(printf '%s\n' "$BATCH" \
      | jq -R . \
      | jq -s '{traceIds: .}')

    BATCH_COUNT=$(printf '%s\n' "$BATCH" | wc -l)

    echo ""
    echo ">>> Deleting batch (${BATCH_COUNT} traces)"

    DELETE_RESPONSE=$(curl -s -X DELETE \
      -u "${PUBLIC_KEY}:${SECRET_KEY}" \
      "${HOST}/api/public/traces" \
      -H "Content-Type: application/json" \
      -d "$JSON")

    echo "$DELETE_RESPONSE"

    echo "Batch deleted"

    # 删除已处理内容
    tail -n +$((DELETE_BATCH + 1)) "$TMP_FILE" > "${TMP_FILE}.next" || true
    mv "${TMP_FILE}.next" "$TMP_FILE"

    sleep "${SLEEP_SECONDS}"

  done

  rm -f "$TMP_FILE"

  PAGE=$((PAGE + 1))

done

echo ""
echo "=================================================="
echo "Cleanup completed"
echo "=================================================="
```

