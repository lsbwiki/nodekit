const util = require('socksv5');

const P = process.env.PORT || 1080;
const U = "myuser77";  // 这里改你的用户名
const W = "mypass88";  // 这里改你的密码

const server = util.createServer((info, accept, deny) => {
  accept();
});

server.listen(P, '0.0.0.0', () => {
  console.log(`Worker started on port ${P}`);
});

server.useAuth(util.auth.UserPassword((u, p, cb) => {
  if (u === U && p === W) return cb(true);
  cb(false);
}));
