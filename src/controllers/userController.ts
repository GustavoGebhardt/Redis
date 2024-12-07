import { Request, Response } from 'express'
import { User, PrismaClient } from '@prisma/client'
import { createHashPassword, verifyPasswordByEmail } from '../helpers/bcrypt'
import logToFile from '../helpers/logToFile'
import jwt from "jsonwebtoken"
import auth from '../config/auth'
import redis from '../config/redis'

const prisma = new PrismaClient()

export async function store(req: Request, res: Response) {
    try {
        const { email, password, username }: User = await req.body

        const hashedPassword = await createHashPassword(password)

        const user: User = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username
            },
        })

        if (user) {
            res.status(201).send(user)
        } else {
            throw new Error('failed verification')
        }
    } catch (e: any) {
        logToFile(e)
        res.status(400).send({ "error": "Erro ao criar usuário" })
    }
}

export async function session(req: Request, res: Response) {
    try {
        const { email, password }: User = await req.body

        let user: User | null = null

        console.time("Total Time")

        console.time("Database Redis")
        await redis.get(`user:email:${email}`, (err: any, cachedUser) => {
            if (err) {
                logToFile(err)
            }

            if (cachedUser) {
                user = JSON.parse(cachedUser)
            }
        })
        console.timeEnd("Database Redis")

        if (!user) {
            console.time("Database Query")
            user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            console.timeEnd("Database Query")
        }

        if (user) {
            console.time("Password Match")
            const isPasswordMatch = await verifyPasswordByEmail(password, user?.password)
            console.timeEnd("Password Match")

            if (isPasswordMatch) {
                redis.setex(`user:email:${user.email}`, 3600, JSON.stringify(user));
                const token = jwt.sign(user, auth.secret!, { expiresIn: auth.expiresIn })
                res.status(201).send({ "token": token })
                console.timeEnd("Total Time");
            } else {
                throw new Error('failed verification')
            }
        } else {
            throw new Error('failed verification')
        }
    } catch (e: any) {
        logToFile(e)
        res.status(400).send({ "error": "Email ou senha invalidos" })
    }
}

export async function remove(req: Request, res: Response) {

}