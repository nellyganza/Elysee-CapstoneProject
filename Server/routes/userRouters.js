import express from 'express';
import userController from '../controllers/userController';
import upload from '../config/multerConfig';
import ImageProcessor from '../middleware/UserImageProcessor';

const userRouter = express.Router();

userRouter.post('/users/signup', upload.single('avatar'), ImageProcessor, userController.save)
userRouter.put('/users/:id',upload.single('photo'), ImageProcessor, userController.update)


export default userRouter;