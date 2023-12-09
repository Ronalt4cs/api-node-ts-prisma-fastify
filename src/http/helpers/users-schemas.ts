import { z } from 'zod'

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})