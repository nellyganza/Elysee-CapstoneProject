/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
class Auth {
	static generateUserAuthToken(user) {
		return jwt.sign({
			_id: user._id,
			email: user.email,
		}, process.env.JWT_SECRET_KEY)
	}
}
export default Auth
