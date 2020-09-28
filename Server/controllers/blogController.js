import { pick } from 'lodash'
import Blog from '../models/Blog'

export default new class BlogController {
	async save(req, res) {
		const data = pick(req.body, ['Title', 'Description', 'Introduction', 'Content', 'photo'])
		const blog = new Blog({ ...data, owner: req.user.id })
		await blog.save()
			.then((item) => {
				res.send({
					message: 'Blog saved to database',
					data: item
				})
			})
			.catch(() => {
				res.status(400).send({
					newmessage: 'unable to save to database'
				})
			})
	}

	async update(req, res) {
		const blog = await Blog.findById({ _id: req.params.id })
		const AllowedUpdates = ['Title', 'Description', 'Introduction', 'Content', 'photo']
		const updates = Object.keys(req.body)
		const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
		if (!isValidOperation) {
			return res.status(404).send({
				message: 'Invalid Data Fields Present'
			})
		}
		try {
			updates.forEach((update) => {
				if (typeof req.body[update] !== typeof blog[update]) {
					throw new Error('Invalid Data Types')
				}
				blog[update] = req.body[update]
			})
			await blog.save()
			return res.status(200).send({
				message: 'The blog was modified',
				data: {
					blog
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: error.message
			})
		}
	}

	async delete(req, res) {
		const blog = await Blog.findOne({ _id: req.params.id })
		if (!blog) {
			return res.status(404).send({
				message: 'Blog not Found'
			})
		}

		await blog.remove()
		return res.status(200).send({
			message: 'The blog was removed'
		})
	}

	async getAll(req, res) {
		const blogs = await Blog.find({})
		return res.status(200).send({
			message: 'Operation Succesfull',
			data: {
				blogs
			}
		})
	}

	async getBlogImage(req, res) {
		try {
			const blog = await Blog.findOne({ _id: req.params.id })
			if (!blog || !blog.photo) {
				throw new Error()
			}
			res.set('Content-Type', 'image/jpeg')
			res.status(200).send(blog.photo)
		} catch (e) {
			return res.status(500).send({
				message: 'An error occured',
				error: e.message
			})
		}
	}

	async getById(req, res) {
		try {
			const blog = await Blog.findById({ _id: req.params.id })
			if (!blog) throw new Error()
			return res.status(200).send({
				message: 'Blog was found',
				data: {
					blog
				}
			})
		} catch (error) {
			return res.status(400).send({
				message: error.message
			})
		}
	}
}()
