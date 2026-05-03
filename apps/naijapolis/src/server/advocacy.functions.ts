import { createServerFn } from '@tanstack/react-start'
import { getAdvocacyContacts, addAdvocacyContact, addActivity } from './db.server'
import type { AdvocacyContact } from '../lib/types'

export const fetchAdvocacyContacts = createServerFn({ method: 'GET' }).handler(async () => {
  return getAdvocacyContacts()
})

export const submitAdvocacyContact = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<AdvocacyContact, 'id' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const contact: AdvocacyContact = { ...data, id: generateId(), created_at: nowISO() }
    await addAdvocacyContact(contact)
    await addActivity({
      id: generateId(),
      person_id: data.person_id,
      person_name: data.person_name,
      type: 'contact_candidate',
      metadata: { issue: data.issue, message: data.message },
      source: 'web',
      sync_status: 'synced',
      created_at: nowISO(),
    })
    return contact
  })
