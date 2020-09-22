import mongoose,{Schema} from 'mongoose';
const commentSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },  
    comment : {
        type: String,
        required: true
    }, 
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }
},{timestamps:true})

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;