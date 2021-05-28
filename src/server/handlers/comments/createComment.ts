import { Request, Response } from "express";
import { createUUID, getTokenData } from "../../../utils";
import { Comment } from "../../../entities";
import * as database from '../../../data'


export const createComment = async (
  req: Request,
  res: Response
) => {
  try {
    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const user = await database.getUserById(tokenData!.id)
    const post = await database.getPostById(req.params.id)

    if (!user) return res.status(404).send("Usuário não encontrado")
    if(!post) return  res.status(404).send('Post não encontrado')

    const newComment = new Comment(
      createUUID(),
      req.body.body,
      user,
      post
    )

    await database.createComment(newComment)

    res.status(201).send("Comentário criado!")
  } catch (error) {
    res.status(500).send("Erro do servidor")
  }
}
