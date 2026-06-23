const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'backend', '.tmp', 'data.db');
console.log('Opening database at:', dbPath);

const db = new Database(dbPath);

// List all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
console.log('Tables:', tables.map(t => t.name));

// Let's check some likely tables
const tableNames = tables.map(t => t.name);

// Look for global, landing_page, navigations, navigation_items
for (const name of tableNames) {
  if (name.includes('navigation') || name.includes('global') || name.includes('link') || name.includes('header') || name.includes('cta')) {
    try {
      const count = db.prepare(`SELECT count(*) as count FROM "${name}"`).get();
      console.log(`Table ${name} has ${count.count} rows`);
      if (count.count > 0) {
        const rows = db.prepare(`SELECT * FROM "${name}" LIMIT 5`).all();
        console.log(`Sample rows from ${name}:`, JSON.stringify(rows, null, 2));
      }
    } catch (e) {
      console.error(`Error reading table ${name}:`, e.message);
    }
  }
}
