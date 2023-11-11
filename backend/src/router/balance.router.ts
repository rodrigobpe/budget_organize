
import BalanceController from "@controllers/balance.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaBalanceRepo from "@repositories/balance/prisma-balance.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import BalanceService from "@services/balance.service";
import { Request, Response, Router } from "express";

const balanceRouter = Router()

const userRepo = new PrismaUserRepo()
const balanceRepo = new PrismaBalanceRepo()
const service = new BalanceService(balanceRepo,userRepo)
const controller = new BalanceController(service)

balanceRouter.use(authMiddleware)
balanceRouter.post('/users/:id/balances', (req:Request,res:Response) => (controller.handleCreateBalance({ req, res })))
balanceRouter.get('/users/balances', (req:Request,res:Response) => (controller.handleGetAllBalances({ req, res })))
// balanceRouter.patch('/:id', (req:Request,res:Response) => (controller.handleUpdateCategory({ req, res })))


export default balanceRouter