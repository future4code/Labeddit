import { Request, Response } from "express";
import { PostVote } from "../../../../entities";
import { getTokenData } from "../../../../utils";
import * as database from "../../../../data"

export const savePostVote = async (
   req: Request,
   res: Response
) => {
   try {
      const tokenData = getTokenData(
         req.headers.authorization!
      )

      const user = await database.getUserById(tokenData!.id)
      if (!user) return res.status(404).send("Usuário não encontrado")

      const post = await database.getPostById(req.params.id)
      if (!post) return res.status(404).send("Post não encontrado")

      const vote = new PostVote(
         req.body.direction,
         post,
         post.id,
         user,
         user.id
      )

      await database.savePostVote(vote)

      if (req.method === "POST")
         res.status(201).send("Vote registrado!")
      else
         res.status(200).end()

   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
