import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";
import {MainContent} from "./MainContent";
import {Post} from "./Post";

@Entity()
export class Comment extends MainContent {

  @ManyToOne('Post')
  readonly post: Post;

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
