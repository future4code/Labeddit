import {Column, PrimaryColumn, ManyToOne, BaseEntity} from "typeorm";
import { User } from "./User";


export class BaseVote extends BaseEntity{

  @PrimaryColumn()
  readonly userId: string

  @Column()
  readonly value: 1 | -1

  @ManyToOne('User')
  readonly user: User

  constructor(
    value: 1 | -1,
    user: User,
    userId: string
  ) {
    super()
    this.value = value
    this.user = user
    this.userId = userId
  }
}

