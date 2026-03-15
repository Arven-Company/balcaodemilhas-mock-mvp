const fs = require('fs');
const path = require('path');
const full = fs.readFileSync(path.join(__dirname, 'create-balcao-telas-only.js'), 'utf8');
const match = full.match(/\(async\s*\(\)\s*=>\s*\{[\s\S]*\}\)\s*\(\)\s*;/);
const code = match ? match[0] : full;
const payload = { code, timeout: 15000 };
console.log(JSON.stringify(payload));
