import express from 'express';
import contactController from '../controllers/contactController';


const contactRouter = express.Router();

contactRouter.post('/contacts', contactController.save)
contactRouter.get('/contacts', contactController.getAll)


export default contactRouter;