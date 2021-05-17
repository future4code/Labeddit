import { Request, Response } from "express";
import { User, Post } from "../../../../entities";
import { getTokenData } from "../../../../utils";
import * as data from '../../../../data/comments/votes/saveCommentVote'
import {CommentVote} from "../../../../entities";
import { getUserById } from "../../../../data";
import { getCommentById } from "../../../../data/comments";

export const saveCommentVote = async (
  req: Request,
  res: Response
) => {
  try {
    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const user = await getUserById(tokenData!.id)
    const commentId = req.params.id
    const comment = await getCommentById(commentId)

    if (!user) return res.status(404).send("User not found")
    if (!comment) return res.status(404).send("Comment not found")

    const newCommentVote = new CommentVote(
      req.body.direction,
      commentId,
      user,
      user.id
    )

    await data.saveCommentVote(newCommentVote)

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
