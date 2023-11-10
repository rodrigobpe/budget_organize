import User from "@entities/user";
import { Category } from "@prisma/client";
import { Response } from "express";

export default class HandleResponse {
    constructor(
        public statusCode: number,
        public message?: string | undefined,
        public data?: Partial<User> | Partial<User>[] | Category | Category[]
    ) { }

    execute(res: Response) {
        return res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            data: this?.data
        })
    }
}