import CategoryController from "@controllers/category.controller";
import authMiddleware from "@middlewares/auth.midd";
import PrismaCategoryRepo from "@repositories/category/prisma-category.repo";
import CategoryService from "@services/category.service";
import { Request, Response, Router } from "express";

const categoryRouter = Router()

const repo = new PrismaCategoryRepo()
const service = new CategoryService(repo)
const controller = new CategoryController(service)

categoryRouter.use(authMiddleware)
categoryRouter.post('/', (req:Request,res:Response) => (controller.handleCreateCategory({ req, res })))
categoryRouter.get('/', (req:Request,res:Response) => (controller.handleGetAllCategories({ req, res })))
categoryRouter.patch('/:id', (req:Request,res:Response) => (controller.handleUpdateCategory({ req, res })))


export default categoryRouter