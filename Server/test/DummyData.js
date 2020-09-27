import User from '../models/User'

const createUser = async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee121',
		password: 'elyseee1231',
		email: 'elysee11@gmail.com',
	})
	await user.save()
	return user
}

export default createUser
