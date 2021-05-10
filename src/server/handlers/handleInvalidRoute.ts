import { Request, Response } from "express";

export const handleInvalidRoute = (
   req: Request,
   res: Response
) => {
   res
      .status(404)
      .send(`Invalid route: ${req.method} ${req.path}`)
}