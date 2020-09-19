import express from 'express';
import BlogController from "../controllers/blogController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'
import verifyToken from '../middleware/auth'


const blogRouter = express.Router();


blogRouter.post('/blogs', verifyToken, upload.single('photo'), ImageProcessor, BlogController.save)


export default blogRouter