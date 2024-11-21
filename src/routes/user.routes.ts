import { Router } from 'express';
import { login, register, logout } from '../controllers/users';
import asyncWrapper from '../utils/asyncWrapper';

const userRouter = Router();

userRouter.post("/register", asyncWrapper(register));
userRouter.post("/login", asyncWrapper(login));
userRouter.get("/logout", asyncWrapper(logout));

export default userRouter;