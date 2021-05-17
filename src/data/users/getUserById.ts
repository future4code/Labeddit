import { User } from "../../entities/User"

export const getUserById = async (
   id: string
): Promise<User | undefined> => {

   const [user] = await User
      .find({ where: { id } })

   return user
}