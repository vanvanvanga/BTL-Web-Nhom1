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

// PHẦN CỦA CHỊ HIỀN -----------------------------------------------------------------

app.listen(PORT);
