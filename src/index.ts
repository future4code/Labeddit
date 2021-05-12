import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "dotenv"
import { userRouter } from "./server/routers/userRouter";
import { BaseEntity, createConnection } from "typeorm";
import {MainContent, User, Comment} from "./entities";
import { Post } from "./entities";
import { postRouter } from "./server/routers/postRouter";


config()

const {
   PORT = 3003,
   DB_HOST,
   DB_USER,
   DB_PASSWORD,
   DB_SCHEMA
} = process.env

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRouter)
app.use("/posts", postRouter)

createConnection({
   type: "mysql",
   host: DB_HOST,
   port: 3306,
   username: DB_USER,
   password: DB_PASSWORD,
   database: DB_SCHEMA,
   entities: [Comment, MainContent, Post, User, BaseEntity],
   synchronize:true
}).then(() => {

   app.listen(PORT, () => {
      console.log(`...server running on port ${PORT}!`);
   })
})
