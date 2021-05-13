import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Post } from "./Post";
import { BaseVote } from "./BaseVote";

@Entity()
export class PostVote extends BaseVote {

   @PrimaryColumn()
   readonly postId: string

   @ManyToOne('Post', { eager: true })
   readonly post: Post

   constructor(
      value: 1 | -1,
      post: Post,
      postId: string,
      user: User,
      userId: string
   ) {
      super(value, user, userId)
      this.post = post;
      this.postId = postId;
   }
}

