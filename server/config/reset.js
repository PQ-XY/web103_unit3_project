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

    console.log('Seeding starter data...')

    const { rows: locations } = await pool.query(
      `
        INSERT INTO locations (name, address, city, state, zip, image)
        VALUES
          ('Echo Lounge', '123 Neon Ave', 'UnityGrid', 'CA', '90001', 'https://picsum.photos/seed/echo/800/500'),
          ('House of Blues', '456 Rhythm Rd', 'UnityGrid', 'CA', '90002', 'https://picsum.photos/seed/blues/800/500'),
          ('The Pavilion', '789 Skyline Dr', 'UnityGrid', 'CA', '90003', 'https://picsum.photos/seed/pavilion/800/500'),
          ('American Airlines Arena', '1010 Center Ct', 'UnityGrid', 'CA', '90004', 'https://picsum.photos/seed/arena/800/500')
        RETURNING id;
      `
    )

    const [l1, l2, l3, l4] = locations.map((l) => l.id)

    await pool.query(
      `
        INSERT INTO events (location_id, title, date, time, image)
        VALUES
          ($1, 'Synthwave Social', CURRENT_DATE + 7, '19:30', 'https://picsum.photos/seed/synth/800/800'),
          ($1, 'Open Mic Night', CURRENT_DATE + 14, '20:00', 'https://picsum.photos/seed/openmic/800/800'),
          ($2, 'Blues Jam Session', CURRENT_DATE + 3, '18:00', 'https://picsum.photos/seed/jam/800/800'),
          ($2, 'Soulful Saturdays', CURRENT_DATE + 10, '21:00', 'https://picsum.photos/seed/soul/800/800'),
          ($3, 'Community Picnic', CURRENT_DATE + 5, '12:00', 'https://picsum.photos/seed/picnic/800/800'),
          ($3, 'Sunset Yoga', CURRENT_DATE + 2, '17:30', 'https://picsum.photos/seed/yoga/800/800'),
          ($4, 'Esports Finals Watch Party', CURRENT_DATE + 9, '19:00', 'https://picsum.photos/seed/esports/800/800'),
          ($4, 'Charity Concert', CURRENT_DATE + 20, '20:30', 'https://picsum.photos/seed/charity/800/800');
      `,
      [l1, l2, l3, l4]
    )

    console.log('Starter data seeded.')
    console.log('Database schema reset complete.')
  } catch (error) {
    console.error('Error resetting database schema:', error)
  } finally {
    await pool.end()
    process.exit(0)
  }
}

resetDatabase()

