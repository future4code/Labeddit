import { User } from "../../entities/User";

export const createUser = (
   newUser: User
): void => {

   User.create(newUser)
}