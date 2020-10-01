import express from 'express'
import 'dotenv/config'
import blogRouter from './routes/blogRouters'
import userRouter from './routes/userRouters'
import contactRouter from './routes/contactRouters'
import portfolioRouter from './routes/portfolioRouters'
import commentRouter from './routes/commentRouters'
import cors from 'cors';

require('./helpers/database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "1800");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
	res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
	res.setHeader("Content-Type", "application/json");
	next();
  });
app.use(blogRouter)
app.use(userRouter)
app.use(contactRouter)
app.use(portfolioRouter)
app.use(commentRouter)

export default app
