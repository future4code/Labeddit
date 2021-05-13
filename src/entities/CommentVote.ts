import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import {Post} from "./Post";
import {BaseVote} from "./BaseVote";
import {Comment} from "./Comment";


enum VOTE_VALUES {
  UP = 1,
  DOWN = -1
}

@Entity()
export class CommentVote extends BaseVote{

  @PrimaryColumn()
  readonly commentId: string

  @ManyToOne('Comment')
  readonly comment: Comment

  constructor(
    value: VOTE_VALUES,
    commentId: string,
    user: User,
    userId: string
  ) {
    super(value, user, userId)
    this.commentId = commentId;
  }
}

