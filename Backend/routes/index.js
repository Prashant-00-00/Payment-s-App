import { accountRouter } from "./account.js";
import { userRouter } from "./user.js";
import { Router } from "express";
export const rootRouter = Router();

rootRouter.use('/user', userRouter)
rootRouter.use('/account', accountRouter)
