import { getManager } from "typeorm";

export const deletePostVote = async (
   userId:string,
   postId: string
): Promise<void> => {

   await getManager().query(`
      DELETE FROM post_vote 
      WHERE userId = "${userId}" AND postId = "${postId}"
   `)
}