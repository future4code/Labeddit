import { NextFunction, Request, Response } from "express";

export const validatePayload = schema => (
   req: Request,
   res: Response,
   next: NextFunction
) => {

   const payload = req.method === "GET"
      ? req.query
      : req.body

   try {
      schema.parse(payload)
      next()
   } catch (error) {
      res.status(422).send(error.message)
   }
}