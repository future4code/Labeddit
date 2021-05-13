import { getManager } from "typeorm"
import { Post } from "../../entities/Post"

type searchOptions = {
  page: number
  size: number
}

export const getPostComments = async (
  userId: string,
  postId: string
  options: searchOptions
): Promise<(Post & {
  voteCount: number,
  userVoteDirection: 1 | -1
})[]> => {

  const { page, size } = options

  const offset: number = (page - 1) * size

  const posts = await getManager().query(
    `SELECT
          comment.*,
            voteSum,
            userVote.value AS userVote
          FROM comment
          LEFT JOIN (
            SELECT sum(value) AS voteSum, commentId
          FROM comment_vote
          GROUP BY commentId
        ) AS votes
          ON comment.id = votes.commentId
          LEFT JOIN (
            SELECT *
            FROM comment_vote
          WHERE userId = "4ba37d70-1f8c-4bb3-a003-eb5121bf1902"
        )  AS userVote
          ON comment.id = userVote.commentId
          WHERE comment.postId = "96b13669-89e1-4b1a-882e-42fce31f0a0e";
          LIMIT ${size}
          OFFSET ${offset}`
  )

  return posts
}
