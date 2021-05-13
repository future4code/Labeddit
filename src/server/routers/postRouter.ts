import { Router } from "express"
import { postSchema } from "../../utils"
import { createPost } from "../handlers"
import { authenticate,validatePayload } from "../middlewares"
import {commentRouter} from "./commentRouter";
import {createCommentSchema, getCommentSchema} from "../../utils/zod";
import {createComment} from "../handlers/comments/createComment";
import {getPostComments} from "../handlers/comments/getPostComments";
import {saveCommentVote} from "../handlers/comments/votes/saveCommentVote";
import {deleteCommentVote} from "../handlers/comments/votes/deleteCommentVote";

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
  // validateId,
  validatePayload(createCommentSchema),
  createComment
)

postRouter.get(
  "/:id/comments",
  authenticate,
  // validateId,
  validatePayload(getCommentSchema),
  getPostComments
)



