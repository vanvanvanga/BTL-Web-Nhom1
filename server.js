const express = require("express");
const app = express();
const PORT = 3105;
const mysql = require("mysql2/promise");

// Set EJS as view engine
app.set("view engine", "ejs");
app.use("/css", express.static("assets/css"));
app.use("/img", express.static("assets/img"));

// Cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// PHẦN CỦA VÂN -----------------------------------------------------------------
// Use res.render to load up the view file

// const connection = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_queseraserasera",
//   password: "DAuk6$TsBkv8hRe",
//   database: "freedb_btl-web-20242",
// });
// console.log("Connected to MySQL");

// const login = require("./routes/login");
// app.use("/login", login);

// PHẦN CỦA LINH -----------------------------------------------------------------

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------

app.listen(PORT);
