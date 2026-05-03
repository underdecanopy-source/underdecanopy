import { createServerFn } from '@tanstack/react-start'
import { getPeople, addPerson, updatePerson } from './db.server'
import type { Person } from '../lib/types'

export const fetchPeople = createServerFn({ method: 'GET' }).handler(async () => {
  return getPeople()
})

export const createPerson = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<Person, 'id' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const person: Person = { ...data, id: generateId(), created_at: nowISO() }
    await addPerson(person)
    return person
  })

export const editPerson = createServerFn({ method: 'POST' })
  .inputValidator((data: Person) => data)
  .handler(async ({ data }) => {
    await updatePerson(data)
    return data
  })
