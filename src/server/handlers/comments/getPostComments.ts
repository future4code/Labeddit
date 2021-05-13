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

    console.log('User id: ', tokenData!.id)
    console.log('Post id: ', req.params.id)

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
    console.log(error.message);

    res.status(500).send("Internal server error, please contact support")
  }
}
