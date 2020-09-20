import Blog from "../models/Blog";
import { pick , remove } from 'lodash';

export default new class BlogController {
    async save(req, res){
        const data = pick(req.body, ['Title','Description','Introduction','Content','photo']);
        data.photo = req.photo;
        const blog = new Blog(data)
        blog.save()
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
    async getAll(req, res) {
        const blogs = await Blog.find({}, {photo: 0})
        return res.status(200).send({
            message: "Operation Succesfull",
            data : {
                blogs
            }
        })
    }
    async getBlogImage(req, res){
        try{
            const blog = await Blog.findOne({_id: req.params.id})
            if(!blog || !blog.photo){
                throw new Error()
            }
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(blog.photo)
        }catch(e){
            return res.status(500).send({
                message: 'An error occured',
                error: e.message
            })
        }
    }
    // getById(req, res) {
    //     const blogId = req.params.id;
    //     const blog = Blog.findBlogById(blogId);
    //     return res.status(200).send({
    //         message: "The blog was found",
    //         data: {
    //             blog
    //         }
    //     })
    // }
    // delete(req, res){
    //     const blogTitle = req.params.title
    //     if(!Blog.findBlogByTitle(blogTitle)){
    //         return res.status(404).send({
    //             message: "Blog with provided id does not exist"
    //         })
    //     }
    //     Blog.deleteBlog(blogTitle);
    //     return res.status(200).send({
    //         status: 200,
    //         message: "The blog was deleted",
    //     })
    // }
    // update(req, res){
    //     const blogTitle = req.params.title


    //     if(!Blog.findBlogByTitle(blogTitle)){
    //         return res.status(404).send({
    //             message: "Blog with provided id does not exist"
    //         })
    //     }
    //     const blog = pick(req.body, ['title','desc','intro','content']);
    //     try{
    //         Blog.updateBlog(blogTitle,blog);
    //         return res.status(204).send({
    //             status: 204,
    //             message: "The blog was Updated!!",
    //         })
    //     }catch (e) {
    //         return res.status(400).send({
    //             message: e.message
    //         })
    //     }
    // 
    // }

}
