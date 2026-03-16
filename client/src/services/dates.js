// Format a time string (HH:MM:SS or HH:MM) into a friendlier format
export const formatTime = async (timeString) => {
  if (!timeString) return ''

  const [hourStr, minuteStr] = timeString.split(':')
  let hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr ?? '0', 10)

  const suffix = hour >= 12 ? 'PM' : 'AM'
  if (hour === 0) {
    hour = 12
  } else if (hour > 12) {
    hour -= 12
  }

  const paddedMinutes = String(minute).padStart(2, '0')
  return `${hour}:${paddedMinutes} ${suffix}`
}

// Convert a remaining time value (in minutes) into a human-readable string
export const formatRemainingTime = async (remaining) => {
  if (remaining == null) return ''

  const value = Number(remaining)
  const isPast = value < 0
  const minutes = Math.abs(value)

  const days = Math.floor(minutes / (60 * 24))
  const hours = Math.floor((minutes % (60 * 24)) / 60)
  const mins = minutes % 60

  const parts = []
  if (days) parts.push(`${days}d`)
  if (hours) parts.push(`${hours}h`)
  if (mins || parts.length === 0) parts.push(`${mins}m`)

  const text = parts.join(' ')
  return isPast ? `-${text}` : text
}

// If the remaining string represents a past event, add a CSS class
export const formatNegativeTimeRemaining = (remainingText, id) => {
  if (!remainingText || !remainingText.startsWith('-')) return

  const el = document.getElementById(`remaining-${id}`)
  if (el) {
    el.classList.add('negative-time-remaining')
  }
}

