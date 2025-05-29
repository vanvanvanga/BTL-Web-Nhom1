const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// ✅ Mật khẩu "123" đã được hash bằng bcrypt
let users = [
  {
    username: 'admin',
    password: '$2b$10$zHg0DHeeLqRCkzXZFHICgeMezbfD2SKKuJK4wUo6mjS4ClIjrCCfG', // hash của "123"
    role: 'admin'
  }
];

// Trang login
router.get('/', (req, res) => {
  res.render('./pages/login');
});

router.get('/login', (req, res) => {
  res.render('./pages/login');
});

// Trang register
router.get('/register', (req, res) => {
  res.render('./pages/register');
});

// Xử lý login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.user = { username: user.username, role: user.role };
    return res.redirect('/');
  } else {
    return res.send('Sai tên đăng nhập hoặc mật khẩu');
  }
});

// Xử lý register
router.post('/register', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('Mật khẩu xác nhận không khớp');
  }

  const exists = users.find(u => u.username === username);
  if (exists) return res.send('Tài khoản đã tồn tại');

  const hash = await bcrypt.hash(password, 10);
  users.push({ username, password: hash, role: 'user' });

  // ✅ Hiển thị alert và redirect
  res.send(`
    <script>
      alert("Đăng ký thành công! Mời bạn đăng nhập.");
      window.location.href = "/login";
    </script>
  `);
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;