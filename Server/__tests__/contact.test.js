/* eslint-disable no-sequences */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import 'jest-extended'
import app from '../app'

import Contact from '../models/Contact'
import User from '../models/User'
import Auth from '../helpers/authToken'

const supertest = require('supertest')

const request = supertest(app)


beforeEach(async () =>{
	await User.deleteMany()
	await Contact.deleteMany()
} )
afterEach(async () =>{
	await User.deleteMany()
	await Contact.deleteMany()
} )
test('should get All Contacts', async () => {
	const response = await request.get('/api/v1/contacts').send()
	expect(response.status).toBe(200)
})

test('Un authorized User should not Send a contact', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'contactUser',
		password: 'elyseee1231',
		email: 'celysee1c@gmail.com',
	})

	await user.save()

	await request.post('/api/v1/contacts').send({
		fullName: 'Mucyo Jean',
		phone: '+250.780784523',
		email: 'mucyojean@gmail.com',
		address: 'KIGALI-RWANDA',
		message: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(401)
})

test('Authorized  User should send a contact', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'contactUser',
		password: 'elyseee1231',
		email: 'admin4@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()
	console.log(authToken)

	await request.post('/api/v1/contacts').set('Authorization', `Bearer ${authToken}`).send({
		fullName: 'Mucyo Jean',
		phone: '+250.780784523',
		email: 'mucyojean@gmail.com',
		address: 'KIGALI-RWANDA',
		message: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(200)
})

test('should send a contact with invalid Info', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'contactUser',
		password: 'elyseee1231',
		email: 'admin4@gmail.com',
	})

	await user.save()
	const authToken = await Auth.generateUserAuthToken(user)

	await request.post('/api/v1/contacts').set('Authorization', `Bearer ${authToken}`).send({
		message: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(400)
})

test('should send a contact with invalid Email', async () => {
	const user = new User({
		fullName: 'Elysee1',
		username: 'contactUser',
		password: 'elyseee1231',
		email: 'admin4@gmail.com',
	})

	await user.save()
	const authToken = await user.generateAuthToken()

	await request.post('/api/v1/contacts').set('Authorization', `Bearer ${authToken}`).send({
		email: 'niahijjcgj',
		message: 'We have to make sure that the contact have beed saved suvccessfully while we are saving contact into mongodb'
	}).expect(400)
})
