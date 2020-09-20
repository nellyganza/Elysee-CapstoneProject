import express from 'express';
import blogRouter from "../Server/routes/blogRouters";

const app = express();

app.use(express.json())
app.use(express.urlencoded())

app.use(blogRouter)

export default app