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

    if (!user) return res.status(404).send("Usuário não encontrado")
    if (!comment) return res.status(404).send("Comentário não encontrado")

    const newCommentVote = new CommentVote(
      req.body.direction,
      commentId,
      user,
      user.id
    )

    await database.saveCommentVote(newCommentVote)

    if(req.method === 'POST') {
      res.status(201).send("Voto registrado!")
    } else {
      res.status(200).end()
    }

  } catch (error) {
    res.status(500).send("Erro do servidor")
  }
}
