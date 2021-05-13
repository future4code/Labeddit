import { Request, Response } from "express";
import { User, Post, PostVote } from "../../../entities";
import { createUUID, getTokenData } from "../../../utils";
import * as data from "../../../data"

export const createPostVote = async (
   req: Request,
   res: Response
) => {
   try {
      const tokenData = getTokenData(
         req.headers.authorization!
      )

      const user = await User.findOne(tokenData!.id)
      if (!user) return res.status(404).send("User not found")

      const post = await Post.findOne(req.params.id)
      if (!post) return res.status(404).send("Post not found")

      const newVote = new PostVote(
         req.body.direction,
         post,
         post.id,
         user,
         user.id
      )

      await data.createPostVote(newVote)

      res.status(201).send("Post created!")
   } catch (error) {
      res.status(500).send("Internal server error, please contact support")
   }
}