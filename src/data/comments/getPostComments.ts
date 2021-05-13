import { getManager } from "typeorm"
import { Comment } from "../../entities"

type searchOptions = {
  page: number
  size: number
}

export const getPostComments = async (
  userId: string,
  postId: string,
  options: searchOptions
): Promise<(Comment & {
  voteCount: number,
  userVoteDirection: 1 | -1
})[]> => {

  const { page, size } = options

  const offset: number = (page - 1) * size

  const comments = await getManager().query(
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
        WHERE userId = "${userId}"
      ) AS userVote
      ON comment.id = userVote.commentId
      WHERE comment.postId = "${postId}"
      LIMIT ${size}
      OFFSET ${offset}`
  )
  console.log(comments)
  return comments
}
