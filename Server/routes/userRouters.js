import express from 'express';
import userController from '../controllers/userController';
import upload from '../config/multerConfig';
import ImageProcessor from '../middleware/UserImageProcessor';
import verifyToken from '../middleware/auth'

const userRouter = express.Router();

userRouter.post('/users/signup', upload.single('avatar'), ImageProcessor, userController.save)
userRouter.put('/users/:id',verifyToken,upload.single('photo'), ImageProcessor, userController.update)
userRouter.get('/users', userController.getAll)
userRouter.get('/users/:id/image', userController.getProfilePicture)
userRouter.post('/users/login',userController.login)


export default userRouter;