import * as zod from "zod"

export const signupSchema = zod.object({
   username:zod.string().min(1),
   email: zod.string().email(),
   password: zod.string().min(8).max(30)
})

export const loginSchema = zod.object({
   email: zod.string().email(),
   password: zod.string().min(8).max(30)
})

export const postSchema = zod.object({
   title: zod.string().nonempty(),
   body: zod.string().nonempty()
})

export const createCommentSchema = zod.object({
   body: zod.string().nonempty()
})
  
export const getCommentSchema = zod.object({
   page: zod.string().optional(),
   size: zod.string().optional()
})
 
export const voteSchema = zod.object({
   direction: zod.enum(["1","-1"])
})

export const getPostsSchema = zod.object({
   page: zod.string().optional(),
   size: zod.string().optional(),
})