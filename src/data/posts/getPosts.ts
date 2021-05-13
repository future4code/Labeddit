import { getManager } from "typeorm"
import { Post } from "../../entities/Post"

export const getPosts = async (
   email: string
): Promise<(Post & {
   voteCount: number,
   commentCount: number,
   userVoteDirection: "up" | "down"
})[]> => {

   const upvoteCountSubQuery = "SELECT COUNT(*) FROM post_vote WHERE value = 'up'" 
   const downvoteCountSubQuery = "SELECT COUNT(*) FROM post_vote WHERE value = 'down'" 
   const commentCountSubQuery = "SELECT COUNT(*) FROM comment WHERE postId = '${postId}'" 

   const posts = await getManager().query(
      `SELECT 
         *,
         ${upvoteCountSubQuery} - ${downvoteCountSubQuery} as voteCount,
         () as commentCount,
         () as userVoteDirection
      FROM post`
   )

   return posts
}