const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'backend', '.tmp', 'data.db');
console.log('Opening database at:', dbPath);

const db = new Database(dbPath);

// List all tables matching pricing
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
const pricingTables = tables.filter(t => t.name.includes('pricing') || t.name.includes('faq') || t.name.includes('charge') || t.name.includes('comparison'));
console.log('Pricing-related tables:', pricingTables.map(t => t.name));

for (const table of pricingTables) {
  try {
    const count = db.prepare(`SELECT count(*) as count FROM "${table.name}"`).get();
    console.log(`Table ${table.name} has ${count.count} rows`);
    if (count.count > 0) {
      const rows = db.prepare(`SELECT * FROM "${table.name}" LIMIT 10`).all();
      console.log(`Sample rows from ${table.name}:`, JSON.stringify(rows, null, 2));
    }
  } catch (e) {
    console.error(`Error reading table ${table.name}:`, e.message);
  }
}
