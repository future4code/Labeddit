import {CommentVote} from "../../../entities";

export const saveCommentVote = async (newVote: CommentVote) => {
  await CommentVote.save(newVote)
}

