# 使用轻量且高性能的 Xray 官方镜像
FROM teddysun/xray:latest

# 将本地的优化配置文件拷贝到容器指定路径
COPY config.json /etc/xray/config.json

# 暴露 SOCKS5 代理端口
EXPOSE 1080

# 启动命令：指定配置文件运行
CMD ["xray", "-c", "/etc/xray/config.json"]
