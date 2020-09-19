import express from 'express';
import portfolioController from "../controllers/portfolioController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'

const portfolioRouter = express.Router();


portfolioRouter.post('/portfolios', upload.single('photo'), ImageProcessor, portfolioController.save)
portfolioRouter.put('/portfolios/:id',upload.single('photo'), ImageProcessor, portfolioController.update)
portfolioRouter.delete('/portfolios/:id', portfolioController.delete)
portfolioRouter.get('/portfolios', portfolioController.getAll);
portfolioRouter.get('/portfolios/:id/image', portfolioController.getPortfolioImage)



export default portfolioRouter