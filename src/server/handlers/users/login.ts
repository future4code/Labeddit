import { Request, Response } from "express";
import { getUserByEmail } from "../../../data";
import { comparePasswords, createToken } from "../../../utils";

export const login = async (
   req: Request,
   res: Response
) => {
   try {
      const user = await getUserByEmail(req.body.email)

      const passwordIsCorrect = comparePasswords(
         req.body.password, user ? user.password : ""
      )
      if (!passwordIsCorrect) return res.status(401).send("Nome de usuário ou senha inválida")

      const token = createToken({
         id: user!.id,
         role: user!.role
      })

      res.send({ token })

   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
