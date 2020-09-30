import mongoose from 'mongoose'
import 'dotenv/config'

const DB_URL = 'mongodb+srv://Elysee:Elysee@123@cluster0.03xpk.mongodb.net/mybrand?retryWrites=true&w=majority'
const DB_TEST_URL = 'mongodb+srv://user:user@cluster0.p4dy4.mongodb.net/testbrand?retryWrites=true&w=majority'
const URL = process.env.NODE_ENV === 'test' ? DB_TEST_URL : DB_URL
console.log(URL, typeof URL)
mongoose.connect(URL, {
	// useMongoClient:true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
