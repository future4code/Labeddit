import { Router } from "express"
import {authenticate, validateId, validatePayload} from "../middlewares"
import {createCommentSchema, getCommentSchema} from "../../utils/zod";
import {createComment} from "../handlers/comments/createComment";
import {saveCommentVote} from "../handlers/comments/votes/saveCommentVote";
import {deleteCommentVote} from "../handlers/comments/votes/deleteCommentVote";
import {getPostComments} from "../handlers/comments/getPostComments";

export const commentRouter = Router()

commentRouter.post(
  "/:id/votes",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  saveCommentVote
)

commentRouter.put(
  "/:id/votes",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  saveCommentVote
)

commentRouter.delete(
  "/:id/votes",
  authenticate,
  // validateId,
  // validatePayload(commentVoteSchema),
  deleteCommentVote
)

