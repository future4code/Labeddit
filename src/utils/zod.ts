import * as zod from "zod"

export const userSchema = zod.object({
   email: zod.string().email(),
   password: zod.string().min(8).max(30)
})

export const postSchema = zod.object({
   title: zod.string().nonempty(),
   content: zod.string().nonempty()
})