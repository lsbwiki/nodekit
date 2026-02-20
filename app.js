const util = require('socksv5');

// 优先级：环境变量端口 > 1080
const P = process.env.APP_PORT || process.env.PORT || 1080;
const U = "myuser77";  
const W = "mypass88";  

const server = util.createServer((info, accept, deny) => {
  // 核心优化 1：直接获取 socket 句柄进行底层调优
  const socket = accept(true); 

  if (socket) {
    // 核心优化 2：禁用 Nagle 算法 (NoDelay)
    // 解决高延迟下小包堆积问题，极大提升网页首屏加载速度
    socket.setNoDelay(true); 
    
    // 核心优化 3：开启 TCP 存活探测
    // 防止跨太平洋的长链路因为瞬间波动被运营商断开
    socket.setKeepAlive(true, 15000); 

    // 核心优化 4：拉大缓冲区 (HighWaterMark)
    // 针对 300ms+ 延迟，默认缓冲区太小会导致 TCP 窗口无法滑开
    // 设置为 512KB 到 1MB 之间，平衡 0.5 核 CPU 的内存压力
    socket.readableHighWaterMark = 512 * 1024;
    socket.writableHighWaterMark = 512 * 1024;

    // 错误处理：防止单个连接异常导致整个 Node 进程崩溃
    socket.on('error', (err) => {
      // 仅打印关键错误，避免日志刷屏占用 CPU
      if(err.code !== 'ECONNRESET') {
        console.error(`Socket Error: ${err.message}`);
      }
    });
  }
});

// 核心优化 5：严格认证流程（必须在 listen 之前）
server.useAuth(util.auth.UserPassword((u, p, cb) => {
  if (u === U && p === W) {
    return cb(true);
  }
  cb(false);
}));

server.listen(P, '0.0.0.0', () => {
  console.log(`[High Performance Mode] SOCKS5 running on ${P}`);
  console.log(`[Config] NoDelay: ON, KeepAlive: 15s, Buffer: 512KB`);
});
