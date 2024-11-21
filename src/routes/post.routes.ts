import { Router } from 'express';
import { createPost, getPost, getPosts, updatePost, deletePost } from '../controllers/post';
import authMiddleware from '../middlewares/authMiddleware';
import asyncWrapper from '../utils/asyncWrapper';

const postRouter = Router();

postRouter.post("/", authMiddleware, asyncWrapper(createPost));
postRouter.patch("/:id", authMiddleware, asyncWrapper(updatePost));
postRouter.get("/", asyncWrapper(getPosts));
postRouter.get("/:id", asyncWrapper(getPost));
postRouter.delete("/:id", authMiddleware, asyncWrapper(deletePost));

export default postRouter;