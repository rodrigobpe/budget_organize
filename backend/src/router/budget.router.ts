
import BudgetController from "@controllers/budget.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaBudgetRepo from "@repositories/budget/prisma-budget.repo";
import PrismaUserRepo from "@repositories/user/prisma-user.repo";
import BudgetService from "@services/budget.service";
import { Request, Response, Router } from "express";

const budgetRouter = Router()

const userRepo = new PrismaUserRepo()
const budgetRepo = new PrismaBudgetRepo()
const service = new BudgetService(budgetRepo,userRepo)
const controller = new BudgetController(service)

budgetRouter.use(authMiddleware)
budgetRouter.post('/user/:id/budgets', (req:Request,res:Response) => (controller.handleCreateBudget({ req, res })))
budgetRouter.get('/budgets', (req:Request,res:Response) => (controller.handleGetAllBudgets({ req, res })))
budgetRouter.delete('/budgets/:budget_id', (req:Request,res:Response) => (controller.handleDeleteBudget({ req, res })))
// budgetRouter.patch('/:id', (req:Request,res:Response) => (controller.handleUpdateCategory({ req, res })))


export default budgetRouter