import express from 'express';
import contactController from '../controllers/contactController';


const contactRouter = express.Router();

contactRouter.get('/contacts', contactController.getAll)
contactRouter.post('/contacts', contactController.save)


export default contactRouter;