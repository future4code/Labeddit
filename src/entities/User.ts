import { Entity, PrimaryColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Post } from "./Post";

export enum USER_ROLES {
   GUEST = "GUEST",
   ADMIN = "ADMIN"
}

export interface authenticationData {
   id: string
   role: USER_ROLES
}

@Entity()
export class User extends BaseEntity {

   @PrimaryColumn()
   readonly id: string;

   @Column()
   readonly role: USER_ROLES

   @Column()
   readonly username: string

   @Column()
   readonly email: string;

   @Column()
   readonly password: string;

   @OneToMany("Post", (post:Post)=> post.user)
   readonly posts: Post[];

   constructor(
      id: string,
      role: string,
      username:string,
      email: string,
      password: string
   ) {
      super()
      this.id = id
      this.role = this.toUserRole(role)
      this.username = username
      this.email = email
      this.password = password
   }

   toUserRole = (value: string) => (value in USER_ROLES)
      ? USER_ROLES[value]
      : USER_ROLES.GUEST
}