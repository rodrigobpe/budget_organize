import { Router } from "express";
import userRouter from "./user.router";
import authRouter from "./auth.router";
import authMiddleware from "@middlewares/auth.midd";

const router = Router()

router.use('/auth',authRouter)


router.use('/users',userRouter)

export default router