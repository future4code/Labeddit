import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { BaseVote } from "./BaseVote";
import { Comment } from "./Comment";


@Entity()
export class CommentVote extends BaseVote {

   @PrimaryColumn()
   readonly commentId: string

   @ManyToOne('Comment')
   readonly comment: Comment

   constructor(
      value: 1 | -1,
      commentId: string,
      user: User,
      userId: string
   ) {
      super(value, user, userId)
      this.commentId = commentId;
   }
}

