import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import {Post} from "./Post";
import {BaseVote} from "./BaseVote";


enum VOTE_VALUES {
  UP = 1,
  DOWN = -1
}

@Entity()
export class PostVote extends BaseVote{

  @PrimaryColumn()
  readonly postId: string

  @ManyToOne('Post')
  readonly post: Post

  constructor(
    value: VOTE_VALUES,
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

