import { createServerFn } from '@tanstack/react-start'
import { getSettings, saveSettings } from './db.server'
import type { AppSettings } from '../lib/types'

export const fetchSettings = createServerFn({ method: 'GET' }).handler(async () => {
  return getSettings()
})

export const updateSettings = createServerFn({ method: 'POST' })
  .inputValidator((data: AppSettings) => data)
  .handler(async ({ data }) => {
    await saveSettings(data)
    return data
  })
