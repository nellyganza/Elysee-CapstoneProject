/* eslint-disable no-tabs */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'jest-extended'
import app from '../app'

import User from '../models/User'

process.env.NODE_ENV = 'test'

const supertest = require('supertest')

const request = supertest(app)

afterEach(async () => {
	await User.deleteMany()
})

describe('User Signup', () => {
	test('should get All users', async () => {
		const response = await request.get('/api/v1/users')

		expect(response.status).toBe(200)
	})

	test('should be able to signup user', async () => {
		const response = await request.post('/api/v1/users/signup').send({
			fullName: 'Elysee',
			username: 'elysee12',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})
		expect(response.status).toBe(202)
	})
	test('Should not signup existing user', async () => {
		const user = new User({
			fullName: 'Elysee',
			username: 'elysee12',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user.save()

		await request.post('/api/v1/users/signup').send({
			fullName: 'Elysee',
			username: 'elysee12',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		}).expect(409)
	})

	test('Should not signup user with incorrect info', async () => {
		await request.post('/api/v1/users/signup').send({
			fullName: 123456,
			username: 275263427,
			password: 'elyseee123',
			email: 23456789988,
		}).expect(400)
	})

	test('Should not signup user with missing info', async () => {
		await request.post('/api/v1/users/signup').send({
			username: 'Nellyggzoo',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		}).expect(400)
	})

	test('should be able to update user', async () => {
		const user = new User({
			fullName: 'Update Elysee',
			username: 'Updateelysee',
			password: 'Updateelyseee123',
			email: 'Updateelysee1@gmail.com',
		})

		await user.save()
		const authToken = await user.generateAuthToken()
		const response = await request.put(`/api/v1/users/${user._id}`)
			.set('Authorization', `Bearer ${authToken}`)
			.send({
				fullName: 'Updated Elysee',
				username: 'Updatedelysee',
				password: 'Updatedelyseee123',
				email: 'Updatedelysee1@gmail.com',
			})

		expect(response.status).toBe(200)
	})

	test('user Should not update profile  with incorrect info', async () => {
		const user = new User({
			fullName: 'Update Elysee',
			username: 'Updateelysee',
			password: 'Updateelyseee123',
			email: 'Updateelysee1@gmail.com',
		})

		await user.save()
		const authToken = await user.generateAuthToken()
		await request.put(`/api/v1/users/${user._id}`).set('Authorization', `Bearer ${authToken}`).send({
			fullName: 123456,
			username: 275263427,
			password: 'elyseee123',
			email: 'Updateelysee1@gmail.com',
		}).expect(400)
	})
})

describe('User signin', () => {
	test('Should signin user with valid info', async () => {
		const user = new User({
			fullName: 'Elysee',
			username: 'elysee',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user.save()

		await request.post('/api/v1/users/login').send({
			email: user.email,
			password: 'elyseee123'
		}).expect(200)
	})

	it('Should not signin user with wrong user email/password', async () => {
		const user1 = new User({
			fullName: 'Elysee',
			username: 'elysee',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user1.save()
		const user2 = new User({
			fullName: 'Polly',
			username: 'polly123',
			password: 'polly1234',
			email: 'polly123@gmail.com',
		})

		await user2.save()

		await request.post('/api/v1/users/login').send({
			email: user1.email,
			password: 'polly123@gmail.com',
		}).expect(401)
	})

	it('Should return an auth token for a correct user', async () => {
		const user = new User({
			fullName: 'Elysee',
			username: 'elysee',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user.save()

		const response = await request.post('/api/v1/users/login').send({
			email: user.email,
			password: 'elyseee123'
		})
		expect(response.body.data.authToken).toBeString()
	})
	test('should not signin a non existent user', async () => {
		const user = new User({
			fullName: 'Elysee',
			username: 'elysee',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user.save()

		await request
			.post('/api/v1/users/login')
			.send({ email: 'mucyodanny@gmail.com', password: 'elyseee123' })
			.expect(404)
	})

	test('Should not signin user with missing email/password', async () => {
		const user = new User({
			fullName: 'Elysee',
			username: 'elysee',
			password: 'elyseee123',
			email: 'elysee1@gmail.com',
		})

		await user.save()

		await request.post('/api/v1/users/login').send({
			email: user.email,
		}).expect(500)
	})
})
