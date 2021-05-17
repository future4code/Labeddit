import { User } from "../../entities/User";

export const createUser = async (
   newUser: User
): Promise<void> => {

   await User.save(newUser)
}