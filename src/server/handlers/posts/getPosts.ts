import { Request, Response } from "express";
import { getTokenData } from "../../../utils";
import * as database from "../../../data"

export const getPosts = async (
   req: Request,
   res: Response
) => {
   try {

      const { page, size } = req.query

      const tokenData = getTokenData(
         req.headers.authorization!
      )

      const posts = await database.getPosts(
         tokenData!.id,
         {
            page: Number(page) || 1,
            size: Number(size) || 10
         }
      )

      res.send(posts)
   } catch (error) {
      console.log(error.message);

      res.status(500).send("Internal server error, please contact support")
   }
}