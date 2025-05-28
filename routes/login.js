const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log("gawddammit");
  let username = req.body.username;
  let password = req.body.password;
  let query = `
    SELECT * FROM users
    WHERE username = "${username}"
    AND password = "${password}"
  `;
  // If username and password is not null
  if (username && password) {
    connection.query(query, (err, results) => {
      if (results.length) {
        res.send("Đăng nhập thành công.");
      } else {
        res.send("Đăng nhập không thành công. Vui lòng kiểm tra thông tin và thử lại.")
      }

      if (err) {
        console.log(err);
      }
    });
  } else {
    res.send("Tên người dùng và mật khẩu không được bỏ trống!");
  }
});

module.exports = router;