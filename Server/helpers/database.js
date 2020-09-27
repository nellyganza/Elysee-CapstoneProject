import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL, {
	// useMongoClient:true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
