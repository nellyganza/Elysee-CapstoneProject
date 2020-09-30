/* eslint-disable no-sequences */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'jest-extended'
import { ObjectId } from 'mongodb'
import app from '../app'

import Blog from '../models/Blog'
import User from '../models/User'

const supertest = require('supertest')

const request = supertest(app)

import Auth from '../helpers/authToken'
beforeEach(async () =>{
	await User.deleteMany()
	await Blog.deleteMany()
} )
afterEach(async () =>{
	await User.deleteMany()
	await Blog.deleteMany()
} )
test('should get All Blogs', async () => {
	const response = await request.get('/api/v1/blogs').send()

	expect(response.status).toBe(200)
})

test('Un authorized User should not Post a blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'belysee1b@gmail.com',
	})

	await user.save()

	await request.post('/api/v1/blogs').send({
		Title: 'Test Blog 15',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb'
	}).expect(401)
})

test('If your are not Admin User, you can not Post a blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'blog123@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()

	await request.post('/api/v1/blogs').set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Blog 2',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb'
	}).expect(401)
})

test('Authorized Admin User should Post a blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})

	await user.save()
	const authToken = await Auth.generateUserAuthToken(user)

	await request.post('/api/v1/blogs').set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Blog 3',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb'
	}).expect(200)
})

test('Should not create Post a blog without Title', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})

	await user.save()
	const authToken = await Auth.generateUserAuthToken(user)

	await request.post('/api/v1/blogs').set('Authorization', `Bearer ${authToken}`).send({
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb'
	}).expect(400)
})

test('should Update a blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 4',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()

	await request.put(`/api/v1/blogs/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Title: 'Test Blog 5 Update'
	}).expect(200)
})

test('should not Update a blog with invalid Data Fields', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 6',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()

	await request.put(`/api/v1/blogs/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Titles: 'Test Blog 7 Update'
	}).expect(404)
})

test('should not Update a blog with invalid Inputs', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 8',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()

	await request.put(`/api/v1/blogs/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({
		Title: 12345
	}).expect(400)
})

test('should Delete a blog', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 9',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()

	await request.delete(`/api/v1/blogs/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not Delete a blog which not exist', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 10',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id
	})

	await blog.save()

	await request.delete(`/api/v1/blogs/${new ObjectId()}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(404)
})

test('should  get a blog image', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 11',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await blog.save()

	await request.get(`/api/v1/blogs/${blog._id}/image`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not  get a blog image with invalid id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 12',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await blog.save()

	await request.get(`/api/v1/blogs/${new ObjectId()}/image`).set('Authorization', `Bearer ${authToken}`).send({}).expect(500)
})

test('should get a blog by id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 13',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await blog.save()

	await request.get(`/api/v1/blogs/${blog._id}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(200)
})

test('should not get a blog with invalid id', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'userBlog',
		password: 'elyseee1231',
		email: 'admin2@gmail.com',
	})
	await user.save()
	const authToken = await user.generateAuthToken()
	const blog = new Blog({
		Title: 'Test Blog 14',
		Description: 'This is the Test Blog',
		Introduction: 'Test blog is for testing a blog',
		Content: 'We have to make sure that the blog have beed saved suvccessfully while we are saving blog into mongodb',
		owner: user._id,
		photo: 'blob:null/c69c0d7b-efe9-4c73-be89-af4b6297e783'
	})

	await blog.save()

	await request.get(`/api/v1/blogs/${new ObjectId()}`).set('Authorization', `Bearer ${authToken}`).send({}).expect(400)
})
