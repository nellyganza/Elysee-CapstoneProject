import mongoose,{Schema} from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator'
import 'dotenv/config'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 15
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value){
            if(value.includes('password')){
                throw new Error('password can not be set to password')
            }
        }
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
    avatar: {
        type: Buffer
    }
}, {timestamps: true})


userSchema.pre('save', async function (next) {
        const user = this
        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password, 10);
        }
        next()
})
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await  User.findOne({email: email});
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Username/Password is incorrect')
    }
    return user;
}


const User = mongoose.model('User', userSchema)
export default User;