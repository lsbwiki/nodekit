FROM teddysun/xray:latest
WORKDIR /app
COPY . .
# 这一行是关键：确保二进制文件具有执行权限
RUN chmod +x /usr/bin/xray
# 即使我们通过变量启动，也留一手默认指令
CMD ["/usr/bin/xray", "-c", "/app/config.json"]
