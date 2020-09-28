import sharp from 'sharp'

const ImageProcessor = async (req, res, next) => {
	if (req.file !== undefined) {
		const buffer = await sharp(req.file.buffer).jpeg().toBuffer()
		req.body.avatar = buffer
		next()
	} else {
		next()
	}
}
export default ImageProcessor
