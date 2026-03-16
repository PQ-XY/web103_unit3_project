import React, { useEffect, useState } from 'react'
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'
import Event from '../components/Event'

const Events = () => {
  const [locationsWithEvents, setLocationsWithEvents] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        const locations = await LocationsAPI.getAllLocations()

        const results = await Promise.all(
          locations.map(async (location) => {
            const events = await EventsAPI.getEventsByLocation(location.id)
            return { location, events }
          })
        )

        setLocationsWithEvents(results)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])

  return (
    <div className='all-events'>
      {locationsWithEvents.map(({ location, events }) => (
        <section key={location.id} className='location-events-group'>
          <h2>{location.name}</h2>
          <p>
            {location.address}, {location.city}, {location.state} {location.zip}
          </p>

          <div className='events-grid'>
            {events && events.length > 0 ? (
              events.map((event) => (
                <Event
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  image={event.image}
                  remaining={event.remaining}
                />
              ))
            ) : (
              <h3>No events at this location yet.</h3>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default Events

