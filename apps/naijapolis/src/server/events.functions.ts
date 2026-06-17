import { createServerFn } from '@tanstack/react-start'
import { getEvents, addEvent, addEventRsvp, addActivity } from './db.server'
import type { Event, EventRsvp } from '../lib/types'

export const fetchEvents = createServerFn({ method: 'GET' }).handler(async () => {
  return getEvents()
})

export const createEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<Event, 'id' | 'rsvp_count' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const event: Event = { ...data, id: generateId(), rsvp_count: 0, created_at: nowISO() }
    await addEvent(event)
    return event
  })

export const rsvpToEvent = createServerFn({ method: 'POST' })
  .inputValidator((data: { event_id: string; event_title: string; person_id: string; person_name: string }) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const rsvp: EventRsvp = {
      id: generateId(),
      event_id: data.event_id,
      person_id: data.person_id,
      person_name: data.person_name,
      created_at: nowISO(),
    }
    await addEventRsvp(rsvp)
    await addActivity({
      id: generateId(),
      person_id: data.person_id,
      person_name: data.person_name,
      type: 'rsvp',
      metadata: { event: data.event_title, event_id: data.event_id },
      source: 'web',
      sync_status: 'synced',
      created_at: nowISO(),
    })
    return rsvp
  })
