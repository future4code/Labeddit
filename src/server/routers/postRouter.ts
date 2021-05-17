import { Router } from "express"
import { postSchema, voteSchema, getPostsSchema } from "../../utils"
import { createPost, savePostVote, getPosts, deletePostVote } from "../handlers"
import {createCommentSchema, getCommentSchema} from "../../utils/zod";
import {createComment, getPostComments} from "../handlers";
import { authenticate, validateId, validatePayload } from "../middlewares"

export const postRouter = Router()

postRouter.post(
   "/",
   authenticate,
   validatePayload(postSchema),
   createPost
)

postRouter.post(
  "/:id/comments",
  authenticate,
  validateId,
  validatePayload(createCommentSchema),
  createComment
)

postRouter.get(
  "/:id/comments",
  authenticate,
  validateId,
  validatePayload(getCommentSchema),
  getPostComments
)

postRouter.get(
   "/",
   authenticate,
   validatePayload(getPostsSchema),
   getPosts
)

postRouter.post(
   "/:id/votes",
   authenticate,
   validateId,
   validatePayload(voteSchema),
   savePostVote
)

postRouter.put(
   "/:id/votes",
   authenticate,
   validateId,
   validatePayload(voteSchema),
   savePostVote
)

postRouter.delete(
   "/:id/votes",
   authenticate,
   validateId,
   deletePostVote
)