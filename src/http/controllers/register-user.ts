import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterUserService } from '@/services/factories/make-register-service'
import { registerBodySchema } from '../helpers/users-schemas'

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {
  const { email, name, password } = registerBodySchema.parse(request.body)

  const registerUserService = makeRegisterUserService()
  await registerUserService.execute({
    email,
    name,
    password,
  })

  return reply.status(201).send()
}
