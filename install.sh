#!/bin/sh

# 定义 Xray 版本
XRAY_VERSION="1.8.4"

# 1. 根据架构下载 Xray (Flux 免费版通常是 amd64)
echo "Downloading Xray v${XRAY_VERSION}..."
curl -L -H "Cache-Control: no-cache" -o xray.zip https://github.com/XTLS/Xray-core/releases/download/v${XRAY_VERSION}/Xray-linux-64.zip

# 2. 解压
unzip -o xray.zip
chmod +x xray

# 3. 删除压缩包节省空间
rm xray.zip

# 4. 运行 Xray
echo "Starting Xray..."
./xray -c config.json
