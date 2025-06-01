const fs = require("fs");
const path = require("path");
const txt = path.join(__dirname, "other", "view-count.json");
console.log(txt);

function count() {
  let view_count = fs.readFileSync(path);
  view_count = JSON.parse(view_count);

  if (req.method == "GET" && req.url != "/favicon.ico") {
    console.log(__dirname);
    view_count++;
    console.log("View count: ", view_count);
    fs.writeFileSync(path, JSON.stringify(view_count));
  }
}
