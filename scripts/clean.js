const fs = require('node:fs');
const path = require('node:path');

const dist = path.join(process.cwd(), 'dist');
fs.rmSync(dist, { recursive: true, force: true });
