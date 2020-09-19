import express from 'express';
import portfolioController from "../controllers/portfolioController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'

const portfolioRouter = express.Router();


portfolioRouter.post('/portfolios', upload.single('photo'), ImageProcessor, portfolioController.save)
portfolioRouter.put('/portfolios/:id',upload.single('photo'), ImageProcessor, portfolioController.update)



export default portfolioRouter