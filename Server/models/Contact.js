import mongoose,{Schema} from 'mongoose';
import validator from 'validator';
const contactSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique:true,
        minlength: 10,
    },
    address : {
        type: String,
        required: true,
        min: 2,
        max: 30
    },   
    message : {
        type: String,
        required: true
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps:true})

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;