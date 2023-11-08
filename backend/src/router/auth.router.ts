import UserController from "@controllers/user.controller";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import UserService from "@services/user.service";
import { Request, Router, Response } from "express";

const authRouter = Router()

const repo = new PrismaUserRepo()
const service = new UserService(repo)
const controller = new UserController(service)

authRouter.post('/',(req:Request,res:Response) => (controller.handleAuth({req,res})))

export default authRouter