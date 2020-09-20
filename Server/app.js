import express from 'express';
require('./config/mongoose')
import blogRouter from "../Server/routes/blogRouters";
import userRouter from '../Server/routes/userRouters';
import contactRouter from '../Server/routes/contactRouters';
import portfolioRouter from '../Server/routes/portfolioRouters';
import commentRouter from '../Server/routes/commentRouters';

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(blogRouter)
app.use(userRouter)
app.use(contactRouter)
app.use(portfolioRouter)
app.use(commentRouter);

export default app