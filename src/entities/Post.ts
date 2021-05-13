import {Entity, Column} from "typeorm";
import { User } from "./User";
import {BaseContent} from "./BaseContent";

@Entity()
export class Post extends BaseContent {

   @Column()
   readonly title: string

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
