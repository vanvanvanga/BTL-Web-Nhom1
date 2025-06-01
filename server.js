const express = require("express");
const app = express();
const PORT = 3105;

app.use(express.urlencoded({extended: false})); // To process POST request bodies
app.set("view engine", "ejs"); // Set EJS as view engine

// Serve static files
app.use("/css", express.static("assets/css"));
app.use("/img", express.static("assets/img"));

const bodyParser = require("body-parser")
app.use(bodyParser.json());

// Cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const session = require("express-session");
const FileStore = require("session-file-store")(session);

// Sessions
app.use(session({
  store: new FileStore({path: "./sessions"}),
  secret: "kitty-kitty-coo",
  cookie: { maxAge: 15*60000 }, // 15 phút
  saveUninitialized: false,
  resave: false
}))

const fs = require("fs");
let views = fs.readFileSync("./other/view-count.json");
    views = JSON.parse(views);

app.use((req, res, next) => {
  res.locals.role = req.session.role;
  res.locals.views = views;
  res.locals.username = req.session.username;
  next();
})

// PHẦN CỦA VÂN -----------------------------------------------------------------
// Use res.render to load up the view file
app.get("/", (req, res, next) => {
  res.render("pages/index")
  next()
});

// Đăng nhập đăng xuất v.v
const login = require("./routes/login");
app.use("/id", login);

// Hiển thị thông tin sách
const books = require("./routes/books");
app.use("/books", books);

// PHẦN CỦA LINH -----------------------------------------------------------------
app.get("/contact", (req, res, next) => {
  res.render("pages/contact")
  next()
});

const connection = require("./routes/connection");
app.post("/contact", (req, res) => {
  const {name, email, message} = req.body;
  let timestamp = new Date().toISOString();

  let query = `
    INSERT INTO contact_queries
    VALUES ("${name}", "${email}", "${message}", "${timestamp}");
  `
  connection.query(query, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).send();
    }
  })
})

const admin = require("./routes/admin");
app.use("/admin", admin);

const vcount = require("./routes/view-count.js");
app.use((req, res) => {
  console.log(req.url);
  if (req.method == "GET" && req.url != "/favicon.ico" && req.url != "/.well-known/appspecific/com.chrome.devtools.json") {
    vcount();
  }
});

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
