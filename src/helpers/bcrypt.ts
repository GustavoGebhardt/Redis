import bcrypt from "bcrypt"

export async function createHashPassword(password: string): Promise<string> {
    const saltRounds: number = 10
    const hashedPassword: string = await bcrypt.hash(password, saltRounds)
    return hashedPassword
}

export async function verifyPasswordByEmail(password: string, hashedPassword: string): Promise<boolean> {
    const isPasswordMatch: boolean = await bcrypt.compare(password, hashedPassword)
    return isPasswordMatch
}