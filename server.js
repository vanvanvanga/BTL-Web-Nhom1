const express = require("express");
const app = express();
const PORT = 3205;
const mysql = require("mysql2");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

// Middleware cơ bản
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static folders
app.use("/css", express.static("assets/css"));
app.use("/img", express.static("assets/img"));

// View engine
app.set("view engine", "ejs");

// // Cấu hình session
// app.use(session({
//   secret: 'bimat_cua_toi', // có thể thay đổi thành biến .env
//   resave: false,
//   saveUninitialized: true
// }));

// // Biến user toàn cục trong EJS
// app.use((req, res, next) => {
//   res.locals.user = req.session.user;
//   next();
// });

// PHẦN CỦA VÂN -----------------------------------------------------------------
app.get("/", (req, res) => {
  res.render("pages/index");
});

// PHẦN CỦA LINH -----------------------------------------------------------------
app.get("/lien-he", (req, res) => {
  res.render("pages/contact");
});

app.post("/contact-form", (req, res) => {
  const { name, email, address } = req.body;
  console.log(req.body.name);
  res.send("Da nhan form");
});

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------

// PHẦN ĐĂNG NHẬP / ĐĂNG KÝ / ĐĂNG XUẤT ----------------------------------------
// Import routes
const login = require("./routes/login.js");
app.use("/id", login);

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});