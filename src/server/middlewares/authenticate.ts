import { NextFunction, Request, Response } from "express";
import { getTokenData } from "../../utils/jsonwebtoken";

export const authenticate = (
   req: Request,
   res: Response,
   next: NextFunction
) => {

   const tokenData = getTokenData(
      req.headers.authorization || ''
   )

   if (!tokenData)
      res
         .status(401)
         .send("Failed to authenticate. Token may be expired or missing from 'Authorization' headers")
   else
      next()
}