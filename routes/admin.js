const express = require("express");
const router = express.Router();
const connection = require("./connection");

router.use(express.urlencoded({extended: false})); 

router.use((req, res, next) => {
  if (req.session.role != "admin") {
    return res.status(403).send("Bạn không có quyền truy cập trang này!");
  }
  next();
});

router.get("/", (req, res, next) => {
  let query = `
    SELECT * FROM comments
    JOIN books
    USING (book_id)
  `
  connection.query(query, (err, results) => {
    if (err) {
      req.params.comments = "Đã có lỗi xảy ra khi load danh sách bình luận."
    } else {
      req.params.comments = results;
    }
    next();
  })
}, (req, res, next) => {
  let query = `
    SELECT * FROM books
  `

  connection.query(query, (err, results) => {
    if (err) {
      req.params.books = "Đã có lỗi xảy ra khi load danh sách các đầu sách trong thư viện."
    } else {
      req.params.books = results;
    }
    next();
  })
}, (req, res, next) => {
  res.render("pages/admin", {
    books: req.params.books,
    comments: req.params.comments
  })
  next();
});

router.post("/delete-comment", (req, res) => {
  let query = `
    DELETE FROM comments
    WHERE comment_id = ${req.body.comment_id}
  `
  connection.query(query, (err, results) => {
    console.error(err);
    if (err) {
      return res.status(500).send("Đã có lỗi xảy ra khi xóa bình luận.");
    }
    else res.status(200).send();
  })
});

router.post("/edit-book-title", (req, res) => {
  console.log(req.body)
  let query = `
    UPDATE books
    SET title = "${req.body.new_book_title}"
    WHERE book_id = ${req.body.book_id}
  `

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Đã có lỗi xảy ra khi cập nhật tiêu đề sách!")
    } else {
      res.status(200).send();
    }
  })
})

router.post("/edit-book-author", (req, res) => {
  console.log(req.body)
  let query = `
    UPDATE books
    SET author = "${req.body.new_book_author}"
    WHERE book_id = ${req.body.book_id}
  `

  connection.query(query, (err, results) => {
    if (err) {
      console.err(err);
      return res.send("Đã có lỗi xảy ra khi cập nhật tác giả sách!")
    } else {
      res.status(200).send();
    }
  });
})

router.post("/edit-book-synopsis", (req, res) => {
  console.log(req.body)
  let query = `
    UPDATE books
    SET synopsis = "${req.body.new_book_synopsis}"
    WHERE book_id = ${req.body.book_id}
  `

  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.send("Đã có lỗi xảy ra khi cập nhật nội dung sách!")
    } else {
      res.status(200).send();
    }
  })
})

module.exports = router;