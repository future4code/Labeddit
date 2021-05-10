import { Router } from "express"
import { USER_ROLES } from "../../entities/User"
import { userSchema } from "../../utils"
import { login ,register} from "../handlers"
import { authenticate,authorize,validatePayload } from "../middlewares"

export const userRouter = Router()

userRouter.post(
   "/register",
   validatePayload(userSchema),
   register
)

userRouter.post(
   "/register/admin",
   authenticate,
   authorize(USER_ROLES.ADMIN),
   validatePayload(userSchema),
   register
)

userRouter.post(
   "/login",
   validatePayload(userSchema),
   login
)