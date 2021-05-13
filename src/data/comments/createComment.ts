import { Comment } from "../../entities";

export const createComment = async (newComment: Comment) => {
 await Comment.save(newComment)
}
