/* eslint-disable no-undef */
import 'jest-extended'
import app from '../app'

import Blog from '../models/Blog'

const supertest = require('supertest')

const request = supertest(app)

afterEach(async () => {
	await Blog.deleteMany()
})

describe('Blog', () => {
	test('should get All Blogs', async () => {
		const response = await request.get('/api/v1/blogs')

		expect(response.status).toBe(200)
	})
})
