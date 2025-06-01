const fs = require("fs");
const path = "other/view-count.json";

function count() {
  let view_count = fs.readFileSync(path);
    view_count = JSON.parse(view_count);
  view_count++;
  fs.writeFileSync(path, JSON.stringify(view_count));
  console.log("View count: ", view_count);
  return view_count;
}

module.exports = count;