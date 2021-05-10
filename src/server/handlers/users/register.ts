import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../../../data";
import { hashPassword, createToken, createUUID } from "../../../utils";
import { User, USER_ROLES } from "../../../entities/User";

export const register = async (
   req: Request,
   res: Response
) => {

   const newUser = new User(
      createUUID(),
      req.body.email,
      hashPassword(req.body.password),
      req.path.includes("admin") ? USER_ROLES.ADMIN : USER_ROLES.GUEST
   )

   const token = createToken({
      id: newUser.id,
      role: newUser.role
   })

   try {
      const user = await getUserByEmail(newUser.email)
      if (user) return res.status(409).send("Email already in use")
      createUser(newUser)

      res.status(201).send({ token })

   } catch (error) {
      res.status(500).send("Internal server error, please contact support")
   }
}