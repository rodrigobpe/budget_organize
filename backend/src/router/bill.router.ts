import { BillController } from "@controllers/bill.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaBillRepo from "@repositories/bill/prisma-bill-repo";
import PrismaCategoryRepo from "@repositories/category/prisma-category.repo";
import PrismaCreditCardRepo from "@repositories/credit-card/prisma-credit-card.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import BillService from "@services/bill.service";
import { Request, Response, Router } from "express";

const billRouter = Router()
const billRepo = new PrismaBillRepo()
const userRepo = new PrismaUserRepo()
const categoryRepo = new PrismaCategoryRepo()
const creditCardRepo = new PrismaCreditCardRepo()
const service = new BillService(billRepo,userRepo,categoryRepo,creditCardRepo)
const controller = new BillController(service)

billRouter.use(authMiddleware)
billRouter.post('/user/:user_id/bills', (req:Request,res:Response) => (controller.handleCreateBill({req,res})))
billRouter.get('/bills/:id', (req:Request,res:Response) => (controller.handleGetBillById({req,res})))
billRouter.get('/bills/', (req:Request,res:Response) => (controller.handleGetAllBillsByUser({req,res})))

export default billRouter