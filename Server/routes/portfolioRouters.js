import express from 'express';
import portfolioController from "../controllers/portfolioController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'

const portfolioRouter = express.Router();


portfolioRouter.get('/portfolios', portfolioController.getAll);
portfolioRouter.get('/portfolios/:id/image', portfolioController.getPortfolioImage)
portfolioRouter.get('/portfolios/:id', portfolioController.getById)
portfolioRouter.post('/portfolios', upload.single('photo'), ImageProcessor, portfolioController.save)
portfolioRouter.delete('/portfolios/:id', portfolioController.delete)
portfolioRouter.put('/portfolios/:id',upload.single('photo'), ImageProcessor, portfolioController.update)

export default portfolioRouter