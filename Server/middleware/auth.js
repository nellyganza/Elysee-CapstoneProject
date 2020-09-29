/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken'
import User from '../models/User'
import 'dotenv/config'

const verifyToken = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '')
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
		const user = await User.findOne({ _id: decoded._id, email: decoded.email })
		if (!user) {
			throw new Error()
		}
		req.user = user
		next()
	} catch (error) {
		return res.status(401).send({
			message: 'Please Authenticate'
		})
	}
}

export default verifyToken
