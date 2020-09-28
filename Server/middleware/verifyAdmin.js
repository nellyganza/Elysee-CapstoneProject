import 'dotenv/config'

const checkAdmin = async (req, res, next) => {
	if (process.env.ADMIN_EMAIL.includes(req.user.email)) {
		next()
	} else {
		return res.status(401).send({
			message: 'Your are not Admin'
		})
	}
}

export default checkAdmin
