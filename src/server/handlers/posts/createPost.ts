import { Request, Response } from "express";
import { Post } from "../../../entities";
import { createUUID, getTokenData } from "../../../utils";
import * as database from "../../../data"

export const createPost = async (
   req: Request,
   res: Response
) => {
   try {
      const tokenData = getTokenData(
         req.headers.authorization!
      )

      const user = await database.getUserById(tokenData!.id)

      if (!user) return res.status(404).send("Usuário não encontrado")

      const newPost = new Post(
         createUUID(),
         req.body.title,
         req.body.body,
         user
      )

      await database.createPost(newPost)

      res.status(201).send("Post criado!")
   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
