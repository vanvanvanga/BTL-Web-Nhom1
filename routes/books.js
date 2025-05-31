const express = require("express");
const router = express.Router();

// Kết nối CSDL
const connection = require("./connection");

// /books
router.get("/", (req, res) => {
  let query = `
    SELECT * FROM books;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else if (results.length == 0) {
      res.send("Trong thư viện hiện đang không có sách :(")
    } else {
      res.render("pages/books-index.ejs", {
        list: results
      });
    }
  });
})

router.get("/:book_id", (req, res, next) => {
  if (parseInt(req.params.book_id)) {
    let query = `
      SELECT * FROM books
      WHERE book_id = ${req.params.book_id}
    `

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
      } else if (results.length == 0) {
        res.send("Không tìm thấy sách!")
      } else {
        req.params.book_info = results[0];
        next();
      }
    })
  } else {
    res.send("error: book id must be an integer");
  }
}, (req, res) => {
  let query = `
    SELECT * FROM copies
    LEFT JOIN borrowing
    USING (copy_id)
    WHERE book_id = ${req.params.book_id};
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.sendStatus(404);
    } else if (results.length == 0) {
      res.send("No copies found.");
    } else {
      console.log(results);
      req.params.status = results;
      res.render("pages/book", {
        item: req.params.book_info,
        status: req.params.status
      })
    }
  })
});

module.exports = router;