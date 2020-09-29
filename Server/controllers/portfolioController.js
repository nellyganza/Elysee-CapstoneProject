import { pick } from 'lodash'
import Portfolio from '../models/Portfolio'

export default new class PortfolioController {
	async save(req, res) {
		const data = pick(req.body, ['Title', 'Description', 'link', 'photo'])
		const portfolio = new Portfolio({ ...data, owner: req.user.id })
		await portfolio.save()
			.then((item) => {
				res.send({
					message: 'Portfolio save to database',
					data: item
				})
			})
			.catch((err) => {
				res.status(400).send({
					message: err.message,
					code: err.code,
					newmessage: 'unable to save to database'
				})
			})
	}

	async update(req, res) {
		const portfolio = await Portfolio.findById({ _id: req.params.id })
		const AllowedUpdates = ['Title', 'Description', 'link', 'photo']
		const updates = Object.keys(req.body)
		const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
		if (!isValidOperation) {
			return res.status(404).send({
				message: 'Invalid Data Fields Present'
			})
		}
		try {
			updates.forEach((update) => {
				portfolio[update] = req.body[update]
			})
			await portfolio.save()
			if (!portfolio) {
				return res.status(404).send({ message: 'An error occured' })
			}
			return res.status(200).send({
				message: 'The portfolio was modified',
				data: {
					portfolio
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: error.message
			})
		}
	}

	async delete(req, res) {
		try {
			const portfolio = await Portfolio.findOne({ _id: req.params.id })
			if (!portfolio) {
				return res.status(404).send({
					message: 'portfolio not Found'
				})
			}

			await portfolio.remove()
			return res.status(200).send({
				message: 'The portfolio was removed'
			})
		} catch (error) {
			return res.status(400).send({
				error: error.message
			})
		}
	}

	async getAll(req, res) {
		const portfolios = await Portfolio.find({}, { photo: 0 })
		return res.status(200).send({
			message: 'Operation Succesfull',
			data: {
				portfolios
			}
		})
	}

	async getPortfolioImage(req, res) {
		try {
			const portfolio = await Portfolio.findOne({ _id: req.params.id })
			if (!portfolio || !portfolio.photo) {
				throw new Error()
			}
			res.set('Content-Type', 'image/jpeg')
			res.status(200).send(portfolio.photo)
		} catch (e) {
			return res.status(500).send({
				message: 'An error occured',
				error: e.message
			})
		}
	}

	async getById(req, res) {
		try {
			const portfolio = await Portfolio.findById({ _id: req.params.id }, { photo: 0 })
			return res.status(200).send({
				message: 'Portfolio was found',
				data: {
					portfolio
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: error.message
			})
		}
	}
}()
