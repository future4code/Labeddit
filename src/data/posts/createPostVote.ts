import { PostVote } from "../../entities";

export const createPostVote = async (
   newVote: PostVote
): Promise<void> => {

   await PostVote.save(newVote)
}