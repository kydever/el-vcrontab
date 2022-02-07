const fs = require('fs');

const data = fs.readFileSync("package.json")
let json = JSON.parse(data);
json.version = process.argv[2];

fs.writeFileSync("package.json", JSON.stringify(json, null, 2));
