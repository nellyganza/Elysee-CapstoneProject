/* eslint-disable no-sequences */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'jest-extended'
import app from '../app'

import Comment from '../models/comment'
import User from '../models/User'
import Blog from '../models/Blog'

process.env.NODE_ENV = 'test'

const supertest = require('supertest')

const request = supertest(app)

afterEach(async () => {
	await Comment.deleteMany()
})
beforeEach(async () => {
	await User.deleteMany()
})
beforeEach(async () => {
	await Blog.deleteMany()
})
beforeAll(async () => {
	await Comment.deleteMany()
})
afterAll(async () => {
	await Comment.deleteMany()
})
test('should get All Comments', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})

	await user.save()
	const blog = new Blog({
		Title: 'Test Blog 1',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})
	await blog.save()
	const response = await request.get(`/api/v1/comments/${blog._id}`)

	expect(response.status).toBe(200)
})

test('Un authorized User should not comment on blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'elysee11@gmail.com',
	})

	await user.save()
	const blog = new Blog({
		Title: 'Test Blog 1',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})
	await blog.save()
	await request.post(`/api/v1/comments/${blog._id}`).send({
		fullName: 'Mucyo Jean',
		phone: '+250.780784523',
		email: 'mucyojean@gmail.com',
		address: 'KIGALI-RWANDA',
		comment: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(401)
})

test('Authorized  User should send a contact', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 1',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()
	await request.post(`/api/v1/comments/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({
		fullName: 'Mucyo Jean',
		blog: blog._id,
		comment: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(200)
})

test('should  not send a comment without the blog we are filling all information', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'elysee1',
		password: 'elyseee1231',
		email: 'nishimwelys@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 1',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})
	await blog.save()
	await request.post(`/api/v1/comments/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({

	}).expect(400)
})
