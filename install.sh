#!/bin/sh
# 1. 把系统自带的 xray 程序 复制到 你的 Git 根目录（/app）下
cp /usr/bin/xray ./xray
# 2. 给它运行权限
chmod +x ./xray
# 3. 运行它，并读取你 Git 里的 config.json
./xray -c config.json
