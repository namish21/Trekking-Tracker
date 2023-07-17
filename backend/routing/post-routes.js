import { Router } from "express";
import { addPosts, deletePost, getAllPosts, getPostById, updatePost } from "../controllers/post-controllers.js";

const postRouter = Router();

postRouter.get("/",getAllPosts);
postRouter.post("/",addPosts);
postRouter.get("/:id",getPostById);
postRouter.put("/:id",updatePost);
postRouter.delete("/:id",deletePost);

export default postRouter;