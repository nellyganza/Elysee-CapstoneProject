import express from 'express';
import BlogController from "../controllers/blogController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'
import verifyToken from '../middleware/auth'
import checkAdmin from '../middleware/verifyAdmin'

const blogRouter = express.Router();


blogRouter.post('/blogs', verifyToken,checkAdmin, upload.single('photo'), ImageProcessor, BlogController.save)
blogRouter.put('/blogs/:id',verifyToken,upload.single('photo'), ImageProcessor, BlogController.update)
blogRouter.delete('/blogs/:id',verifyToken, BlogController.delete)
blogRouter.get('/blogs', BlogController.getAll);
blogRouter.get('/blogs/:id/image', BlogController.getBlogImage)
blogRouter.get('/blogs/:id', BlogController.getById)


export default blogRouter