/* eslint-disable no-tabs */
/* eslint-disable no-console */
/* eslint-disable valid-typeof */
import { pick } from 'lodash'
import User from '../models/User'

export default new class userController {
	async save(req, res) {
		try {
			const user = new User(req.body)
			const usernameExist = await User.findOne({ username: user.username })
			const emailExist = await User.findOne({ email: user.email })
			const isExist = (usernameExist) ? true : !!(emailExist)
			if (isExist) {
				return res.status(409).send({
					message: 'User Already exist'
				})
			}
			await user.save()
			const authToken = await user.generateAuthToken()
			return res.status(202).send({
				message: 'User created',
				data: {
					userEmail: user.email,
					authToken
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: 'Unable to create a user',
				Error: error.message
			})
		}
	}

	async update(req, res) {
		const user = await User.findById({ _id: req.params.id })
		const AllowedUpdates = ['fullName', 'username', 'password', 'email', 'avatar']
		const updates = Object.keys(req.body)
		const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
		if (!isValidOperation) {
			return res.status(404).send({
				message: 'Invalid Data Fields Present'
			})
		}
		try {
			updates.forEach((update) => {
				if (typeof req.body[update] !== typeof user[update]) {
					throw new Error('Invalid Data Types')
				}
				user[update] = req.body[update]
			})
			await user.save()
			return res.status(200).send({
				message: 'User was modified',
				data: {
					user
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: error.message
			})
		}
	}

	async getAll(req, res) {
		const users = await User.find({}, { avatar: 0 })
		return res.status(200).send({
			message: 'Operation Succesfull',
			data: {
				users
			}
		})
	}

	async getProfilePicture(req, res) {
		const user = await User.findOne({ _id: req.params.id })
		if (!user) {
			return res.status(404).send({
				message: 'User not Found',
			})
		}
		if (!user.avatar) {
			return res.status(404).send({
				message: 'Image not Found',
			})
		}
		res.set('Content-Type', 'image/jpeg')
		res.status(200).send(user.avatar)
	}

	async login(req, res) {
		try {
			const data = pick(req.body, ['email', 'password'])
			const user = await User.findByCredentials(data.email, data.password)
			const authToken = await user.generateAuthToken()
			return res.status(200).send({
				message: 'User was logged in ',
				data: {
					user: {
						email: user.email,
						username: user.username
					},
					authToken
				}
			})
		} catch (error) {
			if (error.message === 'Username/Password is incorrect') {
				return res.status(401).send({
					message: error.message
				})
			}
			if (error.message === 'Unable to login') {
				return res.status(404).send({
					message: error.message
				})
			}
			return res.status(500).send({
				message: error.message
			})
		}
	}
}()
