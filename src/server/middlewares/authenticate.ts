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
         .send("Falha na autenticação. Token expirado ou não inserido no campo 'Authorization' dos headers ")
   else
      next()
}
