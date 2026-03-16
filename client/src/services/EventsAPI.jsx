const BASE_URL = '/api'

const EventsAPI = {
  async getEventsByLocation(locationId) {
    const res = await fetch(`${BASE_URL}/locations/${locationId}/events`)
    if (!res.ok) throw new Error('Failed to fetch events for location')
    return res.json()
  },

  async getEventsById(id) {
    const res = await fetch(`${BASE_URL}/events/${id}`)
    if (!res.ok) throw new Error('Failed to fetch event')
    return res.json()
  }
}

export default EventsAPI

