import pg from 'pg'
import dotenv from 'dotenv'

// Ensure env vars are loaded before creating the pool.
dotenv.config({ path: new URL('../.env', import.meta.url) })

const config = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    ssl: {
      rejectUnauthorized: false
    }
}

export const pool = new pg.Pool(config)