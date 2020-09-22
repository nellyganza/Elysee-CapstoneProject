import express from 'express';
import commentController from '../controllers/commentController';
import verifyToken from '../middleware/auth'
const commentRouter = express.Router();

commentRouter.post('/comments/:id',verifyToken,commentController.save);
commentRouter.get('/comments/:id',commentController.getAll);


export default commentRouter;