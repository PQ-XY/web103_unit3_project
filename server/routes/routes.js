import express from 'express'
// import controllers for events and locations
import { getAllLocations, getLocationById } from '../controllers/locations.js'
import { getEventsByLocation, getEventById } from '../controllers/events.js'

const router = express.Router()

// define routes to get events and locations
router.get('/locations', getAllLocations)
router.get('/locations/:id', getLocationById)
router.get('/locations/:locationId/events', getEventsByLocation)
router.get('/events/:id', getEventById)

export default router

