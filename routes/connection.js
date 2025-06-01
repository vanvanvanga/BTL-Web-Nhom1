const mysql = require("mysql2");

// Kết nối CSDL
const connection = mysql.createConnection({
  host: "sql.freedb.tech",
  user: "freedb_queseraserasera",
  password: "DAuk6$TsBkv8hRe",
  database: "freedb_btl-web-20242",
});

connection.connect((err) => {
  if (err) {
    // console.error(`Không thể kết nối tới CSDL: ${err.stack}`);
  } else {
    console.log(`Kết nối thành công!`);
  }
});

module.exports = connection;