import { Router } from 'express';
import { UserController } from '../../controller/UserController';
import { auth } from '../../middlewares/auth';

const userRouter = Router();

userRouter.post('/create', new UserController().create);
userRouter.post('/auth', new UserController().login);

userRouter.use(auth);
userRouter.get('/getprofile', new UserController().getProfile);
userRouter.post('/newpassword', new UserController().forgotPassword);

export { userRouter };
