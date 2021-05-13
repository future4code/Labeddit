import { Post } from "../../entities/Post";

export const createPost = async (
   newPost: Post
): Promise<void> => {

   await Post.save(newPost)
}