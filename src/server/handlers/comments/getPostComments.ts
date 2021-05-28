import { Request, Response } from "express";
import { getTokenData } from "../../../utils";
import * as database from "../../../data"

export const getPostComments = async (
  req: Request,
  res: Response
) => {
  try {

    const { page, size } = req.query

    const tokenData = getTokenData(
      req.headers.authorization!
    )

    const post = await database.getPostById(req.params.id)
    if(!post)return res.status(404).send("Post não encontrado")

    const comments = await database.getPostComments(
      tokenData!.id,
      req.params.id,
      {
        page: Number(page) || 1,
        size: Number(size) || 10
      }
    )

    res.send(comments)
  } catch (error) {
    res.status(500).send("Erro do servidor")
  }
}
