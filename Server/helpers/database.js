import mongoose from 'mongoose'
import 'dotenv/config'

const URL = process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL
mongoose.connect(URL, {
	// useMongoClient:true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
