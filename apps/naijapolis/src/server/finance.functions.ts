import { createServerFn } from '@tanstack/react-start'
import {
  getTransactions, addTransaction,
  getPledges, addPledge,
  getFundraisers,
  addActivity,
} from './db.server'
import type { Transaction, Pledge } from '../lib/types'

export const fetchFinanceData = createServerFn({ method: 'GET' }).handler(async () => {
  const [transactions, pledges, fundraisers] = await Promise.all([
    getTransactions(),
    getPledges(),
    getFundraisers(),
  ])
  return { transactions, pledges, fundraisers }
})

export const createDonation = createServerFn({ method: 'POST' })
  .inputValidator((data: {
    person_id: string
    person_name: string
    amount: number
    channel: Transaction['channel']
    fundraiser_id?: string
  }) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const tx: Transaction = {
      id: generateId(),
      ...data,
      status: 'success',
      reference: `REF-${Date.now()}`,
      created_at: nowISO(),
    }
    await addTransaction(tx)
    await addActivity({
      id: generateId(),
      person_id: data.person_id,
      person_name: data.person_name,
      type: 'donation',
      metadata: { amount: data.amount, channel: data.channel },
      source: 'web',
      sync_status: 'synced',
      created_at: nowISO(),
    })
    return tx
  })

export const createPledge = createServerFn({ method: 'POST' })
  .inputValidator((data: Omit<Pledge, 'id' | 'fulfilled' | 'created_at'>) => data)
  .handler(async ({ data }) => {
    const { generateId, nowISO } = await import('../lib/utils')
    const pledge: Pledge = { ...data, id: generateId(), fulfilled: false, created_at: nowISO() }
    await addPledge(pledge)
    await addActivity({
      id: generateId(),
      person_id: data.person_id,
      person_name: data.person_name,
      type: 'pledge',
      metadata: { amount: data.amount, due_date: data.due_date },
      source: 'web',
      sync_status: 'synced',
      created_at: nowISO(),
    })
    return pledge
  })
