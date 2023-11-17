import { Response } from "express";
import User from "@entities/user";
import Budget from "@entities/Budget";
import Category from "@entities/category";
import CreditCard from "@entities/credit-card";
import Bill from "@entities/bill";

export default class HandleResponse {
    constructor(
        public statusCode: number,
        public message?: string | undefined,
        public data?: Partial<User> | Partial<User>[] | Category | Category[] | Budget | Budget[] | CreditCard | CreditCard[] | Bill | Bill[]
    ) { }

    execute(res: Response) {
        return res.status(this.statusCode).json({
            statusCode: this.statusCode,
            message: this.message,
            data: this?.data
        })
    }
}