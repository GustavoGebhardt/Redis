import bcrypt from "bcrypt"
import dotenv from 'dotenv'
import { User, PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

export async function createHashPassword(password: string) {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export async function verifyPasswordByEmail(user: User) {
    const { email, password } = user
    const usersFound = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (usersFound) {
        const hashedPassword = usersFound.password
        const isPasswordMatch: boolean = await bcrypt.compare(password, hashedPassword)
        if (isPasswordMatch) {
            const authUser = {
                email: user.email,
                username: user.username
            }
            return authUser
        }
        return null // Retornar erro
    } else {
        return null // Retornar erro
    }
}