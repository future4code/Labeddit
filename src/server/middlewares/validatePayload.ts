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
      const errors = error.issues.map((e) => {
         return {
            [e.path[0]]: e.code
         }
      })
      res.status(422).send({
         message: 'Erro ao validar os seguintes parâmetros: ',
         errors
      })
   }
}
