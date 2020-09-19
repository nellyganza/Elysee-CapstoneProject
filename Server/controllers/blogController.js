import Blog from "../models/Blog";
import { pick } from 'lodash';

export default new class BlogController {
    async save(req, res){
        const data = pick(req.body, ['Title','Description','Introduction','Content','photo'])
        const blog = new Blog({...data, owner: req.user.id})
        await blog.save()
            .then(item => {
            res.send("item saved to database");
            })
            .catch(err => {
            res.status(400).send({
                message:err.message,
                code:err.code,
                newmessage:"unable to save to database"
            });
            });

    }
}
