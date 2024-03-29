import { Request, Response } from "express";
import { PostVote } from "../../../../entities";
import { getTokenData } from "../../../../utils";
import * as database from "../../../../data"

export const deletePostVote = async (
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

      await database.deletePostVote(user.id, post.id)

      res.status(204).end()
   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
