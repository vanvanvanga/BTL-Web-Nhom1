const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Kết nối CSDL
const connection = require("./connection");

// Đăng nhập
router.get("/", (req, res) => {
  res.render("pages/login");
});

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

// Đăng ký
router.get("/register", (req, res) => {
  res.render("pages/register");
});

router.post("/register", (req, res) => {
  let { username, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.send("Lỗi: Mật khẩu được nhập lại không đúng.");
  }

  let query = `
    SELECT * FROM users
    WHERE username = "${username}";
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (results.length > 0) {
      return res.send("Lỗi: Tên người dùng đã được sử dụng.");
    }
  });

  bcrypt.hash(password, 8, (err, hash) => {
    if (err) {
      return res.send(err);
    }

    connection.query(
      `
        INSERT INTO users 
        VALUES ("${username}", "${hash}", "user")
        `,
      (err, results) => {
        if (err) return res.send(err);
        res.send("Đăng ký thành công!");
      }
    );
  });
});
module.exports = router;
