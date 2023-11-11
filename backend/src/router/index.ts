import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import categoryRouter from "./category.router";
import balanceRouter from "./balance.router";

const router = Router()

router.use('/auth',authRouter)
router.use('/users',userRouter)
router.use('/categories',categoryRouter)
router.use('/',balanceRouter)
export default router