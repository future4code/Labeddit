import { NextFunction, Request, Response } from "express";
import { validateUUID } from "../../utils";

export const validateId = (
   req: Request,
   res: Response,
   next: NextFunction
) => validateUUID(req.params.id)
      ? next()
      : res.status(422).send("Id inválido")
