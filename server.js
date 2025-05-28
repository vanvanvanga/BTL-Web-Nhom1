const express = require("express");
const app = express();
const PORT = 3105;

// Set EJS as view engine
app.set("view engine", "ejs");
app.use("/css", express.static("assets/css"));
app.use("/img", express.static("assets/img"));

// PHẦN CỦA VÂN -----------------------------------------------------------------
// Use res.render to load up the view file
app.get("/", (req, res) => {
  res.render("pages/index")
});

// PHẦN CỦA LINH -----------------------------------------------------------------
app.get("/contact", (req, res) => {
  res.render("pages/contact")
});

app.post("/contact-form", (req, res) => {
  const {name, email, address} = req.body;
  console.log(req.body.name);
  res.send("Da nhan form");
})

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------

app.listen(PORT);
