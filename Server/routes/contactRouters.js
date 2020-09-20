import express from 'express';
import contactController from '../controllers/contactController';


const contactRouter = express.Router();

contactRouter.post('/contacts', contactController.save)


export default contactRouter;