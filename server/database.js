const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database with the required schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pagamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      associado TEXT NOT NULL,
      franquia TEXT NOT NULL,
      descricao TEXT,
      valor REAL NOT NULL,
      data_vencimento TEXT NOT NULL,
      data_pagamento TEXT,
      status TEXT NOT NULL DEFAULT 'Pendente',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
