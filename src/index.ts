import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "dotenv"
import { userRouter } from "./server/routers/userRouter";
import { createConnection } from "typeorm";
import { User, Comment, PostVote, CommentVote } from "./entities";
import { Post } from "./entities";
import { postRouter } from "./server/routers/postRouter";
import {commentRouter} from "./server/routers/commentRouter";


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
app.use("/comments", commentRouter)


createConnection({
   type: "mysql",
   host: DB_HOST,
   port: 3306,
   username: DB_USER,
   password: DB_PASSWORD,
   database: DB_SCHEMA,
   entities: [CommentVote, PostVote, Comment, Post, User],
   synchronize: true
}).then(async () => {
   app.listen(PORT, () => {
      console.log(`...server running on port ${PORT}!`);
   })
})
