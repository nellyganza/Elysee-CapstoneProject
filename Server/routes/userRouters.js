import express from 'express';
import userController from '../controllers/userController';
import upload from '../config/multerConfig';
import ImageProcessor from '../middleware/UserImageProcessor';

const userRouter = express.Router();

userRouter.post('/users/signup', upload.single('avatar'), ImageProcessor, userController.save)


export default userRouter;