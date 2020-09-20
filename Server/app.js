import express from 'express';
require('./config/mongoose')
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))


export default app