import { Router } from "express"
import { USER_ROLES } from "../../entities/User"
import { signupSchema,loginSchema } from "../../utils"
import { login, signup } from "../handlers"
import { authenticate, authorize, validatePayload } from "../middlewares"

export const userRouter = Router()

userRouter.post(
   "/signup",
   validatePayload(signupSchema),
   signup
)

userRouter.post(
   "/signup/admin",
   authenticate,
   authorize(USER_ROLES.ADMIN),
   validatePayload(signupSchema),
   signup
)

userRouter.post(
   "/login",
   validatePayload(loginSchema),
   login
)