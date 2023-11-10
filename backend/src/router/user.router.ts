import UserController from "@controllers/user.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import UserService from "@services/user.service";
import HandleRequest from "@utils/handle-request";
import { Router } from "express";

const userRouter = Router()

const repo = new PrismaUserRepo()
const service = new UserService(repo)
const controller = new UserController(service)

userRouter.post('/', ({ req, res }: HandleRequest) => (controller.handleCreateUser({ req, res })))
userRouter.use(authMiddleware)
userRouter.get('/', ({ req, res }: HandleRequest) => (controller.handleGetAllUsers({ req, res })))
userRouter.get('/profile', ({ req, res }: HandleRequest) => (controller.handleGetUserById({ req, res })))
userRouter.delete('/:id', ({ req, res }: HandleRequest) => (controller.handleDeleteUser({ req, res })))
userRouter.patch('/:id', ({ req, res }: HandleRequest) => (controller.handleUpdateUser({ req, res })))

export default userRouter