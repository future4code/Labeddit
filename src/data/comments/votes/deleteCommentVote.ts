
import { getManager } from "typeorm";

export const deleteCommentVote = async (userId: string, commentId:string): Promise<void> => {
  await getManager().query(`
      DELETE FROM comment_vote 
      WHERE userId = "${userId}" AND commentId = "${commentId}"
  `)
}



