import multer from 'multer';

const Upload = multer({limits:{
    fileSize: 1000000
}});

export default Upload;