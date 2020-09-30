import mongoose from 'mongoose'
import 'dotenv/config'

let URL
if (process.env.NODE_ENV === 'test') {
	URL = process.env.DB_TEST_URL
} else {
	URL = process.env.DB_URL
}
// process.env.NODE_ENV === 'test' ? process.env.DB_TEST_URL : process.env.DB_URL
mongoose.connect(URL, {
	// useMongoClient:true,
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
