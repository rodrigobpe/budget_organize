import CreditCardController from "@controllers/credit-card.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaCreditCardRepo from "@repositories/credit-card/prisma-credit-card.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import CreditCardService from "@services/credit-card.service";
import { Request, Response, Router } from "express";

const creditCardRouter = Router()

const userRepo = new PrismaUserRepo()
const creditCardRepo = new PrismaCreditCardRepo()
const service = new CreditCardService(userRepo, creditCardRepo)
const controller = new CreditCardController(service)

creditCardRouter.use(authMiddleware)
creditCardRouter.post('/users/:user_id/credit-cards', (req: Request, res: Response) => controller.handleCreateCreditCard({ req, res }))
creditCardRouter.get('/credit-cards', (req: Request, res: Response) => controller.handleGetAllCreditCards({ req, res }))
creditCardRouter.delete('/credit-cards/:id', (req: Request, res: Response) => controller.handleDeleteCreditCard({ req, res }))
creditCardRouter.patch('/credit-cards/:id', (req: Request, res: Response) => controller.handleUpdateCreditCard({ req, res }))

export default creditCardRouter