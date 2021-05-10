import { sign, verify } from "jsonwebtoken"
import { config } from "dotenv"
import { authenticationData } from "../entities/User"

config()

const { JWT_KEY } = process.env

export const createToken = (
   payload: authenticationData,
   expiresIn: string = "12h"
): string => sign(
   payload,
   JWT_KEY!,
   { expiresIn }
)

export const getTokenData = (
   token: string
): authenticationData | null => {
   try {
      const { id, role } = verify(token, JWT_KEY!) as authenticationData

      return { id, role }

   } catch (error) {
      console.log(error.message);
      return null
   }
}