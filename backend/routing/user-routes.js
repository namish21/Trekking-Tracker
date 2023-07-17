import { Router } from "express";
import { getAllUsers, getUserById, signup } from "../controllers/user-controllers.js";
import { login } from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.get("/", getAllUsers );
userRouter.get("/:id",getUserById);
userRouter.post("/signup", signup );
userRouter.post("/login",login );

// userRouter.get("/products",xyxz);

export default userRouter;

