import * as zod from "zod"

export const userSchema = zod.object({
   email: zod.string().email(),
   password: zod.string().min(8).max(30)
})

export const postSchema = zod.object({
   title: zod.string().nonempty(),
   body: zod.string().nonempty()
})

export const voteSchema = zod.object({
   direction: zod.number()
})

export const getPostsSchema = zod.object({
   page: zod.string().optional(),
   size: zod.string().optional(),
})