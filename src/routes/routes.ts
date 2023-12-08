import express from 'express';
import { userRouter } from './user/userRoutes';

const appRoutes = express();

appRoutes.use('/users', userRouter);

export {appRoutes};  