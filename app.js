const util = require('socksv5');

const P = process.env.PORT || 1080;
const U = "myuser77";  
const W = "mypass88";  

const server = util.createServer((info, accept, deny) => {
  // 基础连接处理
  accept();
});

// --- 关键修改点 1: 必须在 listen 之前启用认证 ---
server.useAuth(util.auth.UserPassword((u, p, cb) => {
  console.log(`Auth attempt: user=${u}`); // 增加日志方便调试
  if (u === U && p === W) return cb(true);
  cb(false);
}));

// --- 关键修改点 2: 确保监听地址和端口正确 ---
server.listen(P, '0.0.0.0', () => {
  console.log(`SOCKS5 Server is running on port ${P}`);
  console.log(`Authentication enabled for user: ${U}`);
});
