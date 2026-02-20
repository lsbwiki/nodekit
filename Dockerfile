FROM teddysun/xray:latest
WORKDIR /app
COPY . .
# 赋予执行权限，防止 exit status 2
RUN chmod +x /usr/bin/xray
EXPOSE 1080
# 使用绝对路径启动
CMD ["/usr/bin/xray", "-c", "/app/config.json"]
