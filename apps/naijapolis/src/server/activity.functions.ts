import { createServerFn } from '@tanstack/react-start'
import { getActivities, addActivity } from './db.server'
import type { Activity } from '../lib/types'

export const fetchActivities = createServerFn({ method: 'GET' }).handler(async () => {
  return getActivities()
})

export const createActivity = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<Activity, 'id' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const activity: Activity = {
      ...data,
      id: generateId(),
      created_at: nowISO(),
    }
    await addActivity(activity)
    return activity
  })
