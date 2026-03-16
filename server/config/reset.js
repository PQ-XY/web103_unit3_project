import dotenv from 'dotenv'
import { pool } from './database.js'

dotenv.config()

const resetDatabase = async () => {
  try {
    console.log('Resetting database schema...')

    await pool.query(`
      DROP TABLE IF EXISTS events CASCADE;
      DROP TABLE IF EXISTS locations CASCADE;

      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        zip TEXT NOT NULL,
        image TEXT
      );

      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        image TEXT,
        remaining BIGINT
      );
    `)

    console.log('Database schema reset complete.')
  } catch (error) {
    console.error('Error resetting database schema:', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

resetDatabase()

