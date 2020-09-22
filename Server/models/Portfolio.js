import mongoose, {Schema} from 'mongoose';

const PortfolioSchema = new Schema({
    Title:{
        type:String,
        required:true,
        unique:true
    },
    Description:{
        type:String,
        min:3,
        max:120,
        required:true
    },
    link :{
        type:String,
        required:true
    },
    photo:{
        type:Buffer
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{timestamps:true})

const Portfolio = mongoose.model('Portfolio',PortfolioSchema);
export default Portfolio;