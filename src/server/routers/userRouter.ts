import { Router } from "express"
import { USER_ROLES } from "../../entities/User"
import { userSchema } from "../../utils"
import { login, signup } from "../handlers"
import { authenticate, authorize, validatePayload } from "../middlewares"

export const userRouter = Router()

userRouter.post(
   "/signup",
   validatePayload(userSchema),
   signup
)

userRouter.post(
   "/signup/admin",
   authenticate,
   authorize(USER_ROLES.ADMIN),
   validatePayload(userSchema),
   signup
)

userRouter.post(
   "/login",
   validatePayload(userSchema),
   login
)