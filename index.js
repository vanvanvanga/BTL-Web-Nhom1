const express = require("express");
const app = express();
const PORT = 3105;

app.get("/", (req, res) => {
  res.send(`<h1>Guess I'll stay awake. If this doesn't work I'm gonna sleep. Hello, World! Listening from port ${PORT}.</h1>`)
})

// PHẦN CỦA VÂN

// PHẦN CỦA LINH

// PHẦN CỦA CHỊ HIỀN

app.listen(PORT);
