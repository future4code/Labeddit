import { NextFunction, Request, Response } from "express";
import { getTokenData } from "../../utils/jsonwebtoken";
import { USER_ROLES } from "../../entities/User";

// Sempre deve ser precedido pelo middleware 'authenticate'
export const authorize = (...roles: USER_ROLES[]) => (
   req: Request,
   res: Response,
   next: NextFunction
) => {

   const tokenData = getTokenData(
      req.headers.authorization!
   )

   if (!roles.includes(tokenData!.role))
      res
         .status(403)
         .send("You don't have permission to request this operation")
   else
      next()
}