import {Entity, Column, CreateDateColumn} from "typeorm";
import { User } from "./User";
import {BaseContent} from "./BaseContent";

@Entity()
export class Post extends BaseContent {

   @Column()
   readonly title: string

   @CreateDateColumn()
   createdAt: Date

   constructor(
      id: string,
      title: string,
      body: string,
      user: User,
   ) {
      super(id, body, user)
      this.title = title
   }
}
