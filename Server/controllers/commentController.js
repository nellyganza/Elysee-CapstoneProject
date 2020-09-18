import Comment from '../models/comment';
import { pick } from 'lodash'

export default new class commentController {
    async save(req,res){
        try {
            const data = pick(req.body,['fullName','comment']);
            const comment  = new Comment(data);
            await comment.save();
            return res.status(200).send({
                message: "Comment Sent Succesful",
                comment
            })
        } catch (error) {
            return res.status(400).send({
                message: "Comment not sent",
                error: error.message
            })
        }
    }
    async getAll(req,res){
        try {
            const comments = await Comment.find({});
            return res.status(200).send({
                message: "Comment found !!",
                data: comments
            })
        } catch (error) {
            return res.status(400).send({
                message: "Comments not found",
                error: error.message
            })
        }
    }
}