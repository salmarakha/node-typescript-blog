import { Router } from 'express';
import { login, register, logout } from '../controllers/users';

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);

export default userRouter;