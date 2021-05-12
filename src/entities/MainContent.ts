import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";


export class MainContent extends BaseEntity {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  readonly body: string;

  @ManyToOne("User")
  readonly user: User;

  constructor(
    id: string,
    content: string,
    user: User
  ) {
    super()
    this.id = id
    this.body = content
    this.user = user
  }
}
