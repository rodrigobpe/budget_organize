import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../errors/unauthorized.error";
import jwt from 'jsonwebtoken'
import prisma from "@database/index";
import HttpStatus from "@utils/http-status";
import utcBrazilMilliseconds from "@utils/utcBrazil";

type JWToken = {
    id: string
}
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if (!authorization) throw new UnauthorizedError("Não autorizado, está faltando o JWT")

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.JWT_TOKEN ?? '', async (error, result) => {
        if (error) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: error.message,
                timeStamp: new Date(Date.now() - utcBrazilMilliseconds).toISOString()
            })
        }
        const { id } = result as JWToken
        const user = await prisma.user.findFirst({ where: { user_id: id } })
        if (!user) throw new UnauthorizedError("Usuário não está autorizado")
        req.user_id = id
        next()
    })


}

export default authMiddleware