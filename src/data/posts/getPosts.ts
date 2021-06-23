import { getManager } from "typeorm"
import { Post } from "../../entities/Post"

type searchOptions = {
   page: number
   size: number
}

export const getPosts = async (
   userId: string,
   options: searchOptions = {
      page: 1,
      size: 10
   }
): Promise<(Post & {
   voteCount: number,
   commentCount: number,
   userVoteDirection: "up" | "down"
})[]> => {

   const { page, size } = options

   const offset: number = (page - 1) * size

   const posts = await getManager().query(
      `SELECT 
         post.*,
         voteSum,
         commentCount,
         userVote.value AS userVote,
         user.username
      FROM post
      LEFT JOIN (
         SELECT sum(value) AS voteSum, postId 
         FROM post_vote
         GROUP BY postId
      ) AS votes 
      ON post.id = votes.postId
      LEFT JOIN (
         SELECT count(*) AS commentCount, postId 
         FROM comment
         GROUP BY postId
      ) AS comments 
      ON post.id = comments.postId
      LEFT JOIN (
         SELECT * 
         FROM post_vote
         WHERE userId = "${userId}"
      )  AS userVote
      ON post.id = userVote.postId
      LEFT JOIN user
      ON post.userId = user.id
      ORDER BY createdAt DESC
      LIMIT ${size}
      OFFSET ${offset}`
   )

   return posts
}
