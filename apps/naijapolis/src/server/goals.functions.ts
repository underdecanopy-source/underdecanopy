import { createServerFn } from '@tanstack/react-start'
import { getGoals, updateGoalValue } from './db.server'

export const fetchGoals = createServerFn({ method: 'GET' }).handler(async () => {
  return getGoals()
})

export const updateGoal = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string; current_value: number }) => data)
  .handler(async ({ data }) => {
    await updateGoalValue(data.id, data.current_value)
    return { success: true }
  })
