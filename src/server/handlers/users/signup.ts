import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../../data";
import { hashPassword, createToken, createUUID } from "../../../utils";
import { User, USER_ROLES } from "../../../entities/User";

export const signup = async (
   req: Request,
   res: Response
) => {

   const newUser = new User(
      createUUID(),
      req.path.includes("admin") ? USER_ROLES.ADMIN : USER_ROLES.GUEST,
      req.body.username,
      req.body.email,
      hashPassword(req.body.password)
   )

   const token = createToken({
      id: newUser.id,
      role: newUser.role
   })

   try {
      const user = await getUserByEmail(newUser.email)
      if (user) return res.status(409).send("Email já cadastrado")
      createUser(newUser)

      res.status(201).send({ token })

   } catch (error) {
      res.status(500).send("Erro do servidor")
   }
}
