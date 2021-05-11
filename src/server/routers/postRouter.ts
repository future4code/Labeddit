import { Router } from "express"
import { postSchema } from "../../utils"
import { createPost } from "../handlers"
import { authenticate,validatePayload } from "../middlewares"

export const postRouter = Router()

postRouter.post(
   "/",
   authenticate,
   validatePayload(postSchema),
   createPost
)
