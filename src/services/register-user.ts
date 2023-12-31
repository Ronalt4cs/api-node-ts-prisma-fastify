import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'

interface RegisterUserServiceRequest {
  name: string
  email: string
  password: string
}

interface RegisterUserServiceResponse {
  user: User
}
export class RegisterUserService {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    email,
    name,
    password,
  }: RegisterUserServiceRequest): Promise<RegisterUserServiceResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.getByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    })

    return {
      user,
    }
  }
}
