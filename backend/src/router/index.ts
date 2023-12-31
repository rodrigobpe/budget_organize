import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import budgetRouter from "./budget.router";
import creditCardRouter from "./credit-card.router";
import billRouter from "./bill.router";

const router = Router()

router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/categories',categoryRouter)
router.use('/',budgetRouter)
router.use('/',creditCardRouter)
router.use('/',billRouter)
export default router