import { Router } from 'express';
import { createCategory, getCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category';
import authMiddleware from '../middlewares/authMiddleware';
import asyncWrapper from '../utils/asyncWrapper';

const categoryRouter = Router();

categoryRouter.post("/", authMiddleware, asyncWrapper(createCategory));
categoryRouter.patch("/:id", authMiddleware, asyncWrapper(updateCategory));
categoryRouter.get("/", asyncWrapper(getCategories));
categoryRouter.get("/:id", asyncWrapper(getCategory));
categoryRouter.delete("/:id", authMiddleware, asyncWrapper(deleteCategory));

export default categoryRouter;