import express from 'express';
import commentController from '../controllers/commentController';

const commentRouter = express.Router();

commentRouter.get('/comments',commentController.getAll);
commentRouter.post('/comments',commentController.save)

export default commentRouter;