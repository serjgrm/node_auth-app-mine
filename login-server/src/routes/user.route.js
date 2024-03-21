import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authMiddleWare } from '../middlewares/authMiddleWare.js';
import { catchError } from '../utils/catchError.js';

export const userRouter = new express.Router(); 

userRouter.get('/', authMiddleWare, catchError(userController.getAllActivated))
