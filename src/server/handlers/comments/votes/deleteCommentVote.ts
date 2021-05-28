import { Request, Response } from "express";
import { getTokenData } from "../../../../utils";
import * as database from '../../../../data'


export const deleteCommentVote = async (
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

      if (!user) return res.status(404).send("Usuário não encontrado")
      if (!comment) return res.status(404).send("Comentário não encontrado")

      await database.deleteCommentVote(user.id, commentId)

      res.status(204).end()

   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
