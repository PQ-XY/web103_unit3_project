import { pool } from '../config/database.js'

export const getAllLocations = async (_req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM locations ORDER BY id')
    res.json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch locations' })
  }
}

export const getLocationById = async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await pool.query('SELECT * FROM locations WHERE id = $1', [id])
    if (!rows[0]) return res.status(404).json({ error: 'Location not found' })
    res.json(rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch location' })
  }
}

