/* eslint-disable comma-spacing */
import express from 'express'
import userController from '../controllers/userController'
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/UserImageProcessor'
import verifyToken from '../middleware/auth'

const userRouter = express.Router()

userRouter.post('/api/v1/users/signup', upload.single('avatar'), ImageProcessor, userController.save)
userRouter.put('/api/v1/users/:id',verifyToken,upload.single('avatar'), ImageProcessor, userController.update)
userRouter.get('/api/v1/users', userController.getAll)
userRouter.get('/api/v1/users/:id/image', userController.getProfilePicture)
userRouter.post('/api/v1/users/login',userController.login)

export default userRouter
