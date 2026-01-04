-- Sixarms Landing Page - Email Subscribers Schema
-- Run: wrangler d1 execute sixarms-subscribers --file=schema.sql

CREATE TABLE IF NOT EXISTS subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  source TEXT DEFAULT 'windows-waitlist',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_source ON subscribers(source);
CREATE INDEX IF NOT EXISTS idx_created_at ON subscribers(created_at);
