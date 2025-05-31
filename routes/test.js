const bcrypt = require("bcryptjs");

// Kết nối CSDL
const connection = require("./connection");

let query = `
  SELECT * FROM users
`;

let list = [];
connection.query(query, (err, results) => {
  if (err) return console.log(err);
  list = results;
  console.log(list);
  list.forEach(item => {
    bcrypt.hash(item.password, 8, (err, hash) => {
      if (err) return console.log(err);
      item.password = hash;
      connection.query(`
        UPDATE users
        SET password = "${item.password}"
        WHERE username = "${item.username}"
      `, (err, results) => {
        if (err) return console.log(err);
        console.log(`Successfully updated ${item.username}`);
      })
    });
  })
});
