FROM teddysun/xray:latest
WORKDIR /app
# 复制所有文件（包括你的 config.json）
COPY . .
# 这一行是关键：把 xray 从系统目录强行复制到当前 /app 目录
RUN cp /usr/bin/xray /app/xray && chmod +x /app/xray
EXPOSE 1080
