import { Post } from "../../entities/Post"

export const getPostById = async (
   id: string
): Promise<Post | undefined> => {

   const post = await Post
      .findOne(id)

   return post
}