import User from "@entities/user";
import Budget from "@entities/Budget";
import Category from "@entities/category";
import { Response } from "express";

export default class HandleResponse {
    constructor(
        public statusCode: number,
        public message?: string | undefined,
        public data?: Partial<User> | Partial<User>[] | Category | Category[] | Budget | Budget[]
    ) { }

    execute(res: Response) {
        return res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            data: this?.data
        })
    }
}