import { Entity, PrimaryColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import { User } from "./User";
import {MainContent} from "./MainContent";

@Entity()
export class Post extends MainContent {

   @Column()
   readonly title: string

   constructor(
      id: string,
      title: string,
      body: string,
      user: User
   ) {
      super(id, body, user)
      this.title = title
   }
}
