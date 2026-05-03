import { createServerFn } from '@tanstack/react-start'
import { getCanvassRecords, addCanvassRecord, addActivity } from './db.server'
import type { CanvassRecord } from '../lib/types'

export const fetchCanvassRecords = createServerFn({ method: 'GET' }).handler(async () => {
  return getCanvassRecords()
})

export const createCanvassRecord = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<CanvassRecord, 'id' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const record: CanvassRecord = { ...data, id: generateId(), created_at: nowISO() }
    await addCanvassRecord(record)
    await addActivity({
      id: generateId(),
      person_id: data.person_id,
      person_name: data.person_name,
      type: 'canvass',
      metadata: { polling_unit: data.polling_unit_name, support_level: data.support_level },
      source: data.sync_status === 'pending' ? 'mobile' : 'web',
      sync_status: data.sync_status,
      created_at: nowISO(),
    })
    return record
  })
