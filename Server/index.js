import app from '../Server/app'

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});