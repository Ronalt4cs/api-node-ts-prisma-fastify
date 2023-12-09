import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { loginBodySchema } from '../helpers/users-schemas'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = loginBodySchema.parse(request.body)

  const authenticateService = MakeAuthenticateService()
  await authenticateService.execute({
    email,
    password,
  })

  return reply.status(200).send()
}
