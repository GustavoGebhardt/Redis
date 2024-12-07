import { NextFunction, Request, Response } from 'express'
import jwt from "jsonwebtoken"
import authConfig from "../config/auth.js"
import logToFile from '../helpers/logToFile.js'

export default async function (req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorizatio

        if (token) {
            jwt.verify(token.toString(), authConfig.secret!)
            return next()
        } else {
            throw new Error('failed verification')
        }
    } catch (e: any) {
        logToFile(e)
        res.status(401).send({ error: "Token inválido" })
    }
}