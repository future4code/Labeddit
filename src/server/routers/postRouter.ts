import { Router } from "express"
import { postSchema, voteSchema, getPostsSchema } from "../../utils"
import { createPost } from "../handlers"
import { getPosts } from "../handlers/posts/getPosts"
import { authenticate, validateId, validatePayload } from "../middlewares"

export const postRouter = Router()

postRouter.post(
   "/",
   authenticate,
   validatePayload(postSchema),
   createPost
)

postRouter.get(
   "/",
   authenticate,
   validatePayload(getPostsSchema),
   getPosts
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