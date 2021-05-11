import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {

   @PrimaryColumn()
   readonly id: string;

   @Column()
   readonly title: string

   @Column()
   readonly content: string;

   @ManyToOne("User")
   readonly user: User;

   constructor(
      id: string,
      title: string,
      content: string,
      user: User
   ) {
      super()
      this.id = id
      this.title = title
      this.content = content
      this.user = user
   }
}