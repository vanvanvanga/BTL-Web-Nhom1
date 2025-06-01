const express = require("express");
const router = express.Router();

// Kết nối CSDL
const connection = require("./connection");

// /books
router.get("/", (req, res, next) => {
  let query = `
    SELECT * FROM books;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else if (results.length == 0) {
      res.status(404).send("Trong thư viện hiện đang không có sách :(");
    } else {
      res.render("pages/books-index.ejs", {
        list: results,
      });
    }
    next();
  });
});

router.get(
  "/:book_id",
  (req, res, next) => {
    if (parseInt(req.params.book_id)) {
      let query = `
      SELECT * FROM books
      WHERE book_id = ${req.params.book_id}
    `;

      connection.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(404).send;
        } else if (results.length == 0) {
          return res.status(404).send("Không tìm thấy sách!");
        } else {
          req.params.book_info = results[0];
        }
        next();
      });
    } else {
      res.status(404).send("Lỗi: Mã sách phải là một số nguyên.");
    }
  },
  (req, res, next) => {
    let query = `
    SELECT * FROM copies
    LEFT JOIN borrowing
    USING (copy_id)
    WHERE book_id = ${req.params.book_id};
  `;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(404).send();
      } else if (results.length == 0) {
        req.params.status = "Hiện thư viện đang không có sách này!";
      } else {
        req.params.status = results;
      }
      next();
    });
  },
  (req, res, next) => {
    let query = `
    SELECT * FROM comments
    WHERE book_id = ${req.params.book_id};
  `;

    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(404).send();
      } else if (results.length == 0) {
        req.params.comments = "Hiện chưa có đánh giá về cuốn sách này!";
      } else {
        req.params.comments = results;
      }

      next();
    });
  },
  (req, res, next) => {
    res.render("pages/book", {
      item: req.params.book_info,
      status: req.params.status,
      comments: req.params.comments,
    });
    next()
  }
);

router.post("/book-review", (req, res) => {
  console.log(req.body);
  const {name, email, comment, rating, book_id} = req.body;
  let query = `
    INSERT INTO comments
    VALUES ("${name}", "${email}", "${comment}", "${rating}", ${book_id})
  `
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).send();
    } else {
      res.status(200).send();
    }
  })
});
module.exports = router;
