const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
const content = fs.readFileSync(filePath, 'utf8');
document.getElementById('output').innerHTML = content;