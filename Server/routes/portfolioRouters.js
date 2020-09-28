import express from 'express'
import portfolioController from '../controllers/portfolioController'
import upload from '../config/multerConfig'
import ImageProcessor from '../middleware/BlogImageProcessor'
import verifyToken from '../middleware/auth'
import checkAdmin from '../middleware/verifyAdmin'

const portfolioRouter = express.Router()

portfolioRouter.post('/api/v1/portfolios', verifyToken, checkAdmin, upload.single('photo'), ImageProcessor, portfolioController.save)
portfolioRouter.put('/api/v1/portfolios/:id', verifyToken, upload.single('photo'), ImageProcessor, portfolioController.update)
portfolioRouter.delete('/api/v1/portfolios/:id', verifyToken, portfolioController.delete)
portfolioRouter.get('/api/v1/portfolios', portfolioController.getAll)
portfolioRouter.get('/api/v1/portfolios/:id/image', portfolioController.getPortfolioImage)
portfolioRouter.get('/api/v1/portfolios/:id', portfolioController.getById)

export default portfolioRouter
