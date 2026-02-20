FROM teddysun/xray:latest

# 设置工作目录
WORKDIR /app

# 将当前目录所有文件（包含 config.json）拷贝进去
COPY . .

# 暴露端口
EXPOSE 1080

# 启动命令
CMD ["xray", "-c", "./config.json"]
