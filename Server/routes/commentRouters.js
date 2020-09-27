import express from 'express';
import commentController from '../controllers/commentController';
import verifyToken from '../middleware/auth'
const commentRouter = express.Router();

commentRouter.post('/api/v1/comments/:id',verifyToken,commentController.save);
commentRouter.get('/api/v1/comments/:id',commentController.getAll);


export default commentRouter;