import { Request, Response } from "express";
import { User, Post } from "../../../entities";
import { createUUID, getTokenData } from "../../../utils";
import { Comment } from "../../../entities";
import * as data from '../../../data/comments/createComment'

export const createComment = async (
  req: Request,
  res: Response
) => {
  try {
    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const user = await User.findOne(tokenData!.id)
    const post = await Post.findOne(req.params.id)

    if (!user) return res.status(404).send("User not found")
    if(!post) return  res.status(404).send('Post not found')

    const newComment = new Comment(
      createUUID(),
      req.body.body,
      user,
      post
    )

    await data.createComment(newComment)

    res.status(201).send("Comment created!")
  } catch (error) {
    res.status(500).send("Internal server error, please contact support")
  }
}
