import { config } from 'dotenv/lib/main';
import express from 'express';
import blogRouter from "../Server/routes/blogRouters";
require('./config/mongoose')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(blogRouter)

export default app