import { Router } from "express"
import {authenticate, validateId, validatePayload} from "../middlewares"
import {commentSchema} from "../../utils/zod";
import {createComment} from "../handlers/comments/createComment";
import {saveCommentVote} from "../handlers/comments/votes/saveCommentVote";
import {deleteCommentVote} from "../handlers/comments/votes/deleteCommentVote";


export const commentRouter = Router()

commentRouter.post(
  "/",
  authenticate,
  // validateId,
  validatePayload(commentSchema),
  createComment
)

commentRouter.post(
  "/:id/vote",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  saveCommentVote
)

commentRouter.put(
  "/:id/vote",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  saveCommentVote
)

commentRouter.delete(
  "/:id/vote",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  deleteCommentVote
)

