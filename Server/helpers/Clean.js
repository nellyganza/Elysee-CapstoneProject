/* eslint-disable import/prefer-default-export */
import User from '../models/User'
import Blog from '../models/Blog'
import Portfolio from '../models/Portfolio'
import Comment from '../models/comment'
import Contact from '../models/Contact'

export const DBReset = async () => {
	await User.deleteMany()
	await Blog.deleteMany()
	await Portfolio.deleteMany()
	await Comment.deleteMany()
	await Contact.deleteMany()
}
