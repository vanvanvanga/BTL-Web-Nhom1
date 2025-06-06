const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Kết nối CSDL
const connection = require("./connection");

// Đăng nhập
router.get("/", (req, res, next) => {
  res.render("pages/login");
  next()
});

// Xử lý đăng nhập
router.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let query = `
    SELECT * FROM users
    WHERE username = "${username}"
  `;

  // If username and password is not null
  if (username && password) {
    connection.query(query, (err, results) => {
      if (err) return res.status(500).send();
      if (results.length == 0) {
        return res.render("pages/login", {
          message: "Người dùng không tồn tại hoặc mật khẩu không đúng!"
        })
      }
      bcrypt.compare(password, results[0].password).then(
        (result) => {
          if (result) {
            req.session.username = username;
            req.session.role = results[0].role;
            return res.render("pages/login", {
              message: "Đăng nhập thành công!"
            })
          } else {
            return res.render("pages/login", {
              message: "Người dùng không tồn tại hoặc mật khẩu không đúng!"
            })
          }
        }
      )
    })
  } else {
    res.render("pages/login", {
      message: "Tên người dùng và mật khẩu không được bỏ trống."
    })
  }
});

// Đăng ký
router.get("/register", (req, res, next) => {
  res.render("pages/register", {
    message: null
  });
  next()
});

router.post("/register", (req, res) => {
  let { username, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.render("pages/register", {
      message: "Lỗi: Mật khẩu được nhập lại không đúng."
  });
  }

  let query = `
    SELECT * FROM users
    WHERE username = "${username}";
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      return res.render("pages/register", {
        message: "Có lỗi đã xảy ra, vui lòng thử lại..."
    });
    } else if (results.length > 0) {
      return res.render("pages/register", {
        message: "Lỗi: Tên người dùng đã được sử dụng."
    });
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
        res.render("pages/register", {
          message: "Đăng ký thành công! Mời bạn đăng nhập."
        });
      }
    );
  });
});

router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/")
  })
  next();
})

module.exports = router;
