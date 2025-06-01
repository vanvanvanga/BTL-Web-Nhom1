const mysql = require("mysql2");

// Kết nối CSDL
// const connection = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_queseraserasera",
//   password: "DAuk6$TsBkv8hRe",
//   database: "freedb_btl-web-20242",
// });

// const connection = mysql.createConnection({
//   host: "sql.freedb.tech",
//   user: "freedb_friendly_encounter",
//   password: "DR$Gag#hMEVY3Ww",
//   database: "freedb_btl_web_20242",
// });

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "thietlabuonte",
  database: "btl_web_20242",
});

connection.connect((err) => {
  if (err) {
    console.error(`Không thể kết nối tới CSDL: ${err.stack}`);
  } else {
    console.log(`Kết nối CSDL thành công!`);
  }
});

module.exports = connection;