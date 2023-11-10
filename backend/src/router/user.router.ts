import UserController from "@controllers/user.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import UserService from "@services/user.service";
import { Router, Response, Request } from "express";

const userRouter = Router()

const repo = new PrismaUserRepo()
const service = new UserService(repo)
const controller = new UserController(service)

userRouter.post('/', (req: Request, res: Response) => (controller.handleCreateUser({ req, res })))
userRouter.use(authMiddleware)
userRouter.get('/', (req: Request, res: Response) => (controller.handleGetAllUsers({ req, res })))
userRouter.get('/profile', (req: Request, res: Response) => (controller.handleGetUserById({ req, res })))
userRouter.delete('/:id', (req: Request, res: Response) => (controller.handleDeleteUser({ req, res })))
userRouter.patch('/:id', (req: Request, res: Response) => (controller.handleUpdateUser({ req, res })))

export default userRouter