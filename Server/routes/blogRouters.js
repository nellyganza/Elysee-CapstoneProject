import express from 'express';
import BlogController from "../controllers/blogController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/processor'

const blogRouter = express.Router();


blogRouter.get('/blogs', BlogController.getAll);
blogRouter.get('/blogs/:id/image', BlogController.getBlogImage)
blogRouter.get('/blogs/:id', BlogController.getById)
blogRouter.post('/blogs', upload.single('photo'), ImageProcessor, BlogController.save)
blogRouter.delete('/blogs/:id', BlogController.delete)
blogRouter.put('/blogs/:id',upload.single('photo'), ImageProcessor, BlogController.update)

export default blogRouter