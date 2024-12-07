import { Request, Response } from 'express'
import { User, PrismaClient } from '@prisma/client'
import { createHashPassword } from '../helpers/bcrypt'
import logToFile from '../helpers/logToFile'

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
        }
    } catch (e: any) {
        logToFile(e)
        res.status(400).send({ "error": "Erro ao criar usuário" })
    }
}

export async function show(req: Request, res: Response) {

}

export async function update(req: Request, res: Response) {

}

export async function remove(req: Request, res: Response) {

}