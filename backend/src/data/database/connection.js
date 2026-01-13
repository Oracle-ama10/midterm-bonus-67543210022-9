// ไฟล์: backend/src/data/database/connection.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ✅ แก้ใหม่: ใช้ process.cwd() เพื่อระบุรากของโปรเจกต์ (โฟลเดอร์ backend)
const dbPath = path.join(process.cwd(), 'library.db');

console.log('📦 Database Path:', dbPath); // ให้มันบอกเราชัดๆ ว่าสร้างที่ไหน

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error: ไม่สามารถเปิด Database ได้', err.message);
    } else {
        console.log('✅ Connected to SQLite database successfully.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        isbn TEXT UNIQUE NOT NULL,
        status TEXT DEFAULT 'available',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;