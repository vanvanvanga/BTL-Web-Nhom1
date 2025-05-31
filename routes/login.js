const express = require("express");
const router = express.Router();

// Kết nối CSDL
const connection = require("./connection");

// Điều hướng các trang
router.get("/", (req, res) => {
  res.render("pages/login")
})

// Xử lý đăng nhập
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `
    SELECT * FROM users
    WHERE username = "${username}"
    AND password = "${password}"
  `;

  // If username and password is not null
  connection.query(query, (err, results) => {
    if (results.length) {
      res.send(`Xin chào, ${results[0].username}!`);
    } else {
      res.send("Tên người dùng hoặc mật khẩu không chính xác.");
    }

    if (err) {
      console.log(err);
    }
  });
});

module.exports = router;
