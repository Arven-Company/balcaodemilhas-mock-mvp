const fs = require('fs');
const path = require('path');
const file = process.argv[2];
if (!file) process.exit(1);
const full = fs.readFileSync(path.join(__dirname, file), 'utf8');
const match = full.match(/\(async\s*\(\)\s*=>\s*\{[\s\S]*\}\)\s*\(\)\s*;/);
const code = match ? match[0] : full.split('\n').slice(3).join('\n');
console.log(JSON.stringify({ code, timeout: 15000 }));
