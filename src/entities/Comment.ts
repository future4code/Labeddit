import { Entity, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User";
import { BaseContent } from "./BaseContent";
import { Post } from "./Post";

@Entity()
export class Comment extends BaseContent {

   @ManyToOne('Post')
   readonly post: Post;

   @CreateDateColumn()
   createdAt: Date

   constructor(
      id: string,
      body: string,
      user: User,
      post: Post
   ) {
      super(id, body, user)
      this.post = post
   }
}
