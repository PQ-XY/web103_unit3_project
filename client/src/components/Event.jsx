import React, { useState, useEffect } from 'react'
import '../css/Event.css'
import * as dates from '../services/dates'

const Event = (props) => {
  const [time, setTime] = useState('')
  const [remaining, setRemaining] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const result = await dates.formatTime(props.time)
        setTime(result)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [props.time])

  useEffect(() => {
    ;(async () => {
      try {
        const timeRemaining = await dates.formatRemainingTime(props.remaining)
        setRemaining(timeRemaining)
        dates.formatNegativeTimeRemaining(timeRemaining, props.id)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [props.remaining, props.id])

  return (
    <article className='event-information'>
      <img src={props.image} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{props.title}</h3>
          <p>
            <i className='fa-regular fa-calendar fa-bounce'></i> {props.date}{' '}
            <br /> {time}
          </p>
          <p id={`remaining-${props.id}`}>{remaining}</p>
        </div>
      </div>
    </article>
  )
}

export default Event