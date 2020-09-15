import express from 'express';
import BlogController from "../controllers/blogController";

const blogRouter = express.Router();


blogRouter.get('/blogs', BlogController.getAll);
blogRouter.get('/blogs/:id', BlogController.getById)
blogRouter.post('/blogs', BlogController.save)
blogRouter.delete('/blogs/:title', BlogController.delete)
blogRouter.put('/blogs/:title', BlogController.update)

export default blogRouter