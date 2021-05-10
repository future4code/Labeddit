import { User } from "../../entities/User"

export const getUserByEmail = async (
   email: string
): Promise<User | undefined> => {

   const [user] = await User
      .find({ where: { email } })

   return user
}