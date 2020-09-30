/* eslint-disable no-sequences */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'jest-extended'
import { ObjectId } from 'mongodb'
import app from '../app'

import Portfolio from '../models/Portfolio'
import User from '../models/User'

const supertest = require('supertest')

const request = supertest(app)

afterEach(async () => {
	await Portfolio.deleteMany()
})
beforeEach(async () => {
	await User.deleteMany()
})
beforeAll(async () => {
	await Portfolio.deleteMany()
})
afterAll(async () => {
	await Portfolio.deleteMany()
})
afterEach((done) => {
	done()
})

test('should get All Portfolios', async () => {
	const response = await request.get('/api/v1/portfolios').send()

	expect(response.status).toBe(200)
})

test('Un authorized User should not Post a portfolio', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'elysee11@gmail.com',
	})

	await user.save()

	await request.post('/api/v1/portfolios').send({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',

	}).expect(401)
})

test('If your are not Admin User, you can not Post a portfolio', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'elysee1231@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()

	await request.post('/api/v1/portfolios').set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com'

	}).expect(401)
})

test('Authorized Admin User should Post a portfolio', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()

	await request.post('/api/v1/portfolios').set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com'

	}).expect(200)
})

test('Should not create Post a portfolio without Title', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()

	await request.post('/api/v1/portfolios').set('Authorization', `Bearer ${authToken}`).send({
		Description: 'This is the Test Portfolio',
		link: 'www.github.com'

	}).expect(400)
})

test('should Update a portfolio', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id
	})

	await portfolio.save()

	await request.put(`/api/v1/portfolios/${portfolio._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Portfolio 1 Update'
	}).expect(200)
})

test('should not Update a portfolio with invalid Data Fields', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id
	})

	await portfolio.save()

	await request.put(`/api/v1/portfolios/${portfolio._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Titles: 'Test Portfolio 1 Update'
	}).expect(404)
})

test('should not Update a portfolio with invalid Inputs', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id
	})

	await portfolio.save()

	await request.put(`/api/v1/portfolios/${portfolio._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Title: 12345
	}).expect(400)
})

test('should Delete a portfolio', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id
	})

	await portfolio.save()

	await request.delete(`/api/v1/portfolios/${portfolio._id}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not Delete a portfolio which not exist', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id
	})

	await portfolio.save()

	await request.delete(`/api/v1/portfolios/${new ObjectId()}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(404)
})

test('should  get a portfolio image', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await portfolio.save()

	await request.get(`/api/v1/portfolios/${portfolio._id}/image`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not  get a portfolio image with invalid id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await portfolio.save()

	await request.get(`/api/v1/portfolios/${new ObjectId()}/image`).set('Authorization', `Bearer ${authToken}`).send({}).expect(500)
})

test('should get a portfolio by id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await portfolio.save()

	await request.get(`/api/v1/portfolios/${portfolio._id}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not get a portfolio with invalid id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const portfolio = new Portfolio({
		Title: 'Test Portfolio 1',
		Description: 'This is the Test Portfolio',
		link: 'www.github.com',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await portfolio.save()

	await request.get(`/api/v1/portfolios/${new ObjectId()}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(400)
})
