import express from 'express'
import contactController from '../controllers/contactController'
import verifyToken from '../middleware/auth'

const contactRouter = express.Router()

contactRouter.post('/api/v1/contacts', verifyToken, contactController.save)
contactRouter.get('/api/v1/contacts', contactController.getAll)

export default contactRouter
