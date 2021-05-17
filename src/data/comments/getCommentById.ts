import { Comment } from "../../entities";

export const getCommentById = async (id: string) => {
   
   const [comment] = await Comment
      .find({ where: { id } })

   return comment
}
