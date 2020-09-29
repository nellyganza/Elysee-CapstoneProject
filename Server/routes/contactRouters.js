import express from 'express';
import contactController from '../controllers/contactController';
import verifyToken from '../middleware/auth'

const contactRouter = express.Router();

contactRouter.post('/contacts',verifyToken, contactController.save)
contactRouter.get('/contacts', contactController.getAll)


export default contactRouter;