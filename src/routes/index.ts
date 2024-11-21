import { Router } from 'express';
import userRouter from './user.routes';
import categoryRouter from './category.routes';
import postRouter from './post.routes';
import tagRouter from './tag.routes';

const router = Router();

router.use('/api/user', userRouter);
router.use('/api/category', categoryRouter);
router.use('/api/tag', tagRouter);
router.use('/api/post', postRouter);

export default router;