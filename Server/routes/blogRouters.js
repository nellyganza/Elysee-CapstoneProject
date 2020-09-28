/* eslint-disable linebreak-style */
import express from 'express'
import BlogController from '../controllers/blogController'
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'
import verifyToken from '../middleware/auth'
import checkAdmin from '../middleware/verifyAdmin'

const blogRouter = express.Router()

blogRouter.post('/api/v1/blogs', verifyToken, checkAdmin, upload.single('photo'), ImageProcessor, BlogController.save)
blogRouter.put('/api/v1/blogs/:id', verifyToken, upload.single('photo'), ImageProcessor, BlogController.update)
blogRouter.delete('/api/v1/blogs/:id', verifyToken, BlogController.delete)
blogRouter.get('/api/v1/blogs', BlogController.getAll)
blogRouter.get('/api/v1/blogs/:id/image', BlogController.getBlogImage)
blogRouter.get('/api/v1/blogs/:id', BlogController.getById)

export default blogRouter
