import { Request, Response } from "express";
import { User, Post } from "../../../entities";
import { createUUID, getTokenData } from "../../../utils";

export const createPost = async (
   req: Request,
   res: Response
) => {
   try {
      const tokenData = getTokenData(
         req.headers.authorization!
      )

      const user = await User.findOne(tokenData!.id)

      if (!user) return res.status(404).send("User not found")

      const newPost = new Post(
         createUUID(),
         req.body.title,
         req.body.content,
         user
      )

      await Post.save(newPost)

      res.status(201).send("Post created!")
   } catch (error) {
      res.status(500).send("Internal server error, please contact support")
   }
}