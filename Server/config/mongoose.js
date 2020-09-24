import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URL, {
	// useMongoClient:true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
