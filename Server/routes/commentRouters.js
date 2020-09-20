import express from 'express';
import commentController from '../controllers/commentController';

const commentRouter = express.Router();

commentRouter.post('/comments',commentController.save);
commentRouter.get('/comments',commentController.getAll);


export default commentRouter;