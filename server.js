const express = require("express");
const app = express();
const PORT = 3105;

app.use(express.urlencoded({extended: false})); // To process POST request bodies
app.set("view engine", "ejs"); // Set EJS as view engine

// Serve static files
app.use("/css", express.static("assets/css"));
app.use("/img", express.static("assets/img"));

// Cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// PHẦN CỦA VÂN -----------------------------------------------------------------
// Use res.render to load up the view file
app.get("/", (req, res) => {
  res.render("pages/index")
});

// Đăng nhập đăng xuất v.v
const login = require("./routes/login");
app.use("/id", login);

// Hiển thị thông tin sách
const books = require("./routes/books");
app.use("/books", books);

// PHẦN CỦA LINH -----------------------------------------------------------------
app.get("/contact", (req, res) => {
  res.render("pages/contact")
});

const connection = require("./routes/connection");
app.post("/contact-form", (req, res) => {
  const {name, email, message} = req.body;
  let query = `
    INSERT INTO contact_queries
    VALUES ("${name}", "${email}", "${message}");
  `
  connection.query(query, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Da nhan phan hoi");
    }
  })
})

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------
// const session = require("express-session");
// const FileStore = require("session-file-store")(session);

// app.use(session({
//   store: new FileStore({path: "./sessions"}),
//   secret: "kitty-kitty-coo",
//   cookie: { maxAge: 15*60000 }, // 15 phút
//   saveUninitialized: true,
//   resave: false
// }))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
