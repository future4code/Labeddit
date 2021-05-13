import { PostVote } from "../../entities";

export const savePostVote = async (
   newVote: PostVote
): Promise<void> => {

   await PostVote.save(newVote)
}