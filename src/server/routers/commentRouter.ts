import { Router } from "express"
import {authenticate, validateId, validatePayload} from "../middlewares"
import {voteSchema} from "../../utils/zod";
import {saveCommentVote,deleteCommentVote} from "../handlers";

export const commentRouter = Router()

commentRouter.post(
  "/:id/votes",
  authenticate,
  validateId,
  validatePayload(voteSchema),
  saveCommentVote
)

commentRouter.put(
  "/:id/votes",
  authenticate,
  validateId,
  validatePayload(voteSchema),
  saveCommentVote
)

commentRouter.delete(
  "/:id/votes",
  authenticate,
  validateId,
  deleteCommentVote
)

