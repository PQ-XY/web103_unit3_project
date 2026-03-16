import { pool } from '../config/database.js'

export const getEventsByLocation = async (req, res) => {
  const { locationId } = req.params
  try {
    const { rows } = await pool.query(
      `
        SELECT
          *,
          CAST(EXTRACT(EPOCH FROM ((date::timestamp + time) - NOW())) / 60 AS BIGINT) AS remaining
        FROM events
        WHERE location_id = $1
        ORDER BY date, time
      `,
      [locationId]
    )
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch events for location' })
  }
}

export const getEventById = async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await pool.query(
      `
        SELECT
          *,
          CAST(EXTRACT(EPOCH FROM ((date::timestamp + time) - NOW())) / 60 AS BIGINT) AS remaining
        FROM events
        WHERE id = $1
      `,
      [id]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Event not found' })
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch event' })
  }
}

