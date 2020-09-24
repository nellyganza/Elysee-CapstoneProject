import { pick } from 'lodash'
import Contact from '../models/Contact'

export default new class contactController {
	async save(req, res) {
		const data = pick(req.body, ['fullName', 'email', 'phone', 'address', 'message'])
		const contact = new Contact({ ...data, owner: req.user.id })
		await contact.save()
			.then((item) => {
				res.send({
					message: 'Message Sent Successfully!!',
					data: item
				})
			})
			.catch((err) => {
				res.status(400).send({
					error: err.message,
					newmessage: 'unable to Send Message'
				})
			})
	}

	async getAll(req, res) {
		const contacts = await Contact.find({})
		return res.status(200).send({
			message: 'Operation Succesfull',
			data: {
				contacts
			}
		})
	}
}()
