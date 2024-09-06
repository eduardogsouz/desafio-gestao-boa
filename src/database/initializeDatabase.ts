import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
        CREATE TABLE IF NOT EXISTS characters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            status TEXT NOT NULL,
            species TEXT NOT NULL,
            type TEXT,
            gender TEXT,
            origin_name TEXT,
            location_name TEXT,
            image TEXT
        );
        `);
}
