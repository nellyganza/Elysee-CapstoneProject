import express from 'express';
import portfolioController from "../controllers/portfolioController";
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'
import verifyToken from '../middleware/auth'

const portfolioRouter = express.Router();


portfolioRouter.post('/portfolios',verifyToken, upload.single('photo'), ImageProcessor, portfolioController.save)
portfolioRouter.put('/portfolios/:id',verifyToken,upload.single('photo'), ImageProcessor, portfolioController.update)
portfolioRouter.delete('/portfolios/:id',verifyToken, portfolioController.delete)
portfolioRouter.get('/portfolios', portfolioController.getAll);
portfolioRouter.get('/portfolios/:id/image', portfolioController.getPortfolioImage)
portfolioRouter.get('/portfolios/:id', portfolioController.getById)



export default portfolioRouter