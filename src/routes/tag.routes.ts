import { Router } from 'express';
import { createTag, getTag, getTags, updateTag, deleteTag } from '../controllers/tag';
import authMiddleware from '../middlewares/authMiddleware';
import asyncWrapper from '../utils/asyncWrapper';

const tagRouter = Router();

tagRouter.post("/", authMiddleware, asyncWrapper(createTag));
tagRouter.patch("/:id", authMiddleware, asyncWrapper(updateTag));
tagRouter.get("/", asyncWrapper(getTags));
tagRouter.get("/:id", asyncWrapper(getTag));
tagRouter.delete("/:id", authMiddleware, asyncWrapper(deleteTag));

export default tagRouter;