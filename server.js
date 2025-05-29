const express = require("express");
const app = express();
const PORT = 3105;
const mysql = require("mysql2/promise");

app.use(express.urlencoded({extended: false}));

// Set EJS as view engine
app.set("view engine", "ejs");
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

// const connection = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_queseraserasera",
//   password: "DAuk6$TsBkv8hRe",
//   database: "freedb_btl-web-20242",
// });

// if (connection) {
//   console.log("Connected");
// }

// const login = require("./routes/login");
// app.use("/login", login);

// PHẦN CỦA LINH -----------------------------------------------------------------
app.get("/contact", (req, res) => {
  res.render("pages/contact")
});

app.post("/contact-form", (req, res) => {
  const {name, email, address} = req.body;
  console.log(name, email, address);
  res.send("Da nhan form");
})

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
