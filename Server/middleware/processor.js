import { isEmpty, isObject } from 'lodash';
import sharp from 'sharp';
const ImageProcessor = async (req, res, next) => {
    console.log(req.file)
    if(req.file != undefined){
            // next();
        
        try {

            const buffer = await sharp(req.file.buffer).resize({width:250, height:250}).jpeg().toBuffer();
            req.body.photo = buffer;
            next();
        }catch(e){
            return res.status(400).send({
            message : e.message
        })
        }
    }
    else
    {
        next();
    }
}
export default ImageProcessor;