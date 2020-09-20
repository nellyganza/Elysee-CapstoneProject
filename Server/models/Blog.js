import mongoose, {Schema} from 'mongoose';

const blogSchema = new Schema({
    Title:{
        type:String,
        required:true,
        unique:true
    },
    Description:{
        type:String,
        min:3,
        max:60,
        required:true
    },
    Introduction:{
        type:String,
        min:3,
        max:60,
        required:true
    },
    Content: {
        type:String,
        min:20,
        max:255,
        required:true
    },
    photo:{
        type:Buffer
    }
},{timestamps:true})

const Blog = mongoose.model('Blog',blogSchema);
export default Blog;