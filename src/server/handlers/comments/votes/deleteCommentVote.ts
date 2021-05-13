import { Request, Response } from "express";
import { User } from "../../../../entities";
import { getTokenData } from "../../../../utils";
import * as data from '../../../../data/comments/votes/deleteCommentVote'


export const deleteCommentVote = async (
  req: Request,
  res: Response
) => {
  try {
    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const user = await User.findOne(tokenData!.id)
    const commentId = req.params.id

    if (!user) return res.status(404).send("User not found")


    await data.deleteCommentVote(user.id, commentId)

      res.status(204).end()

  } catch (error) {
    res.status(500).send("Internal server error, please contact support")
  }
}
