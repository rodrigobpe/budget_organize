import UserController from "@controllers/user.controller";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import UserService from "@services/user.service";
import { Request, Response, Router } from "express";

const userRoute = Router()

const repo = new PrismaUserRepo()
const service = new UserService(repo)
const controller = new UserController(service)

userRoute.post('/', (req:Request,res:Response) => (controller.handleCreateUser({req,res})))
userRoute.get('/', (req:Request,res:Response) => (controller.handleGetAllUsers({req,res})))
userRoute.get('/:id', (req:Request,res:Response) => (controller.handleGetUserById({req,res})))
userRoute.delete('/:id', (req:Request,res:Response) => (controller.handleDeleteUser({req,res})))
userRoute.patch('/:id', (req:Request,res:Response) => (controller.handleUpdateUser({req,res})))

export default userRoute