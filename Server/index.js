/* eslint-disable no-console */
import app from './app'

const PORT = process.env.PORT || 3500

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
