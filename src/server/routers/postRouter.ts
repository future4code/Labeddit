import { Router } from "express"
import { postSchema, voteSchema } from "../../utils"
import { createPost } from "../handlers"
import { authenticate, validateId, validatePayload } from "../middlewares"

export const postRouter = Router()

postRouter.post(
   "/",
   authenticate,
   validatePayload(postSchema),
   createPost
)

postRouter.post(
   "/:id/vote",
   authenticate,
   validateId,
   validatePayload(voteSchema),
   // createPostVote
)

postRouter.put(
   "/:id/vote",
   authenticate,
   validateId,
   validatePayload(voteSchema)
   // changePostVote
)