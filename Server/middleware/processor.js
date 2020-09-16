import sharp from 'sharp';
const ImageProcessor = async (req, res, next) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).jpeg().toBuffer();
        req.photo = buffer;
        next();
    }catch(e){
        return res.status(400).send({
        message : e.message
    })
    }
}
export default ImageProcessor;