import { Request, Response } from "express";
import { getTokenData } from "../../../../utils";
import * as database from '../../../../data'
import {CommentVote} from "../../../../entities";


export const saveCommentVote = async (
  req: Request,
  res: Response
) => {
  try {
    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const user = await database.getUserById(tokenData!.id)
    const commentId = req.params.id
    const comment = await database.getCommentById(commentId)

    if (!user) return res.status(404).send("User not found")
    if (!comment) return res.status(404).send("Comment not found")

    const newCommentVote = new CommentVote(
      req.body.direction,
      commentId,
      user,
      user.id
    )

    await database.saveCommentVote(newCommentVote)

    if(req.method === 'POST') {
      res.status(201).send("Vote saved!")
    } else {
      res.status(200).end()
    }

  } catch (error) {
     console.log(error.message);

    res.status(500).send("Internal server error, please contact support")
  }
}
