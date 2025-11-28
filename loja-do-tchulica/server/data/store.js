const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

async function read() {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') {
      await write([]);
      return [];
    }
    throw err;
  }
}

async function write(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = { read, write };
