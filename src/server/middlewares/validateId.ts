import { NextFunction, Request, Response } from "express";
import { validateUUID } from "../../utils/uuid";

export const validateId = (
   req: Request,
   res: Response,
   next: NextFunction
) => validateUUID(req.params.id)
      ? next()
      : res.status(422).send("Invalid id")