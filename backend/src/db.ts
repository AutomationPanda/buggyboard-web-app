import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { mkdirSync, existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataDir = join(__dirname, "..", "data");
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}

const dbPath = join(dataDir, "buggyboard.db");
export const db = new Database(dbPath);

/** Ensure bugs table exists. Severity is HIGH, MID, LOW. State is OPEN, CLOSED. */
export function initBugsTable(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS bugs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      severity TEXT NOT NULL CHECK (severity IN ('HIGH', 'MID', 'LOW')),
      owner TEXT NOT NULL,
      description TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT 'OPEN' CHECK (state IN ('OPEN', 'CLOSED'))
    )
  `);
}
