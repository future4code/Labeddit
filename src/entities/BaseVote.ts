import { Column, PrimaryColumn, ManyToOne } from "typeorm";
import { User } from "./User";


enum VOTE_VALUES {
  UP = 1,
  DOWN = -1
}


export class BaseVote {

  @PrimaryColumn()
  readonly userId: string

  @Column()
  readonly value: VOTE_VALUES

  @ManyToOne('User')
  readonly user: User

  constructor(
    value: VOTE_VALUES,
    user: User,
    userId: string
  ) {
    this.value = value
    this.user = user
    this.userId = userId
  }
}

