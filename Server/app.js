import express from 'express'
import blogRouter from './routes/blogRouters'
import userRouter from './routes/userRouters'
import contactRouter from './routes/contactRouters'
import portfolioRouter from './routes/portfolioRouters'
import commentRouter from './routes/commentRouters'

require('./config/mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.use(blogRouter)
app.use(userRouter)
app.use(contactRouter)
app.use(portfolioRouter)
app.use(commentRouter)

export default app
