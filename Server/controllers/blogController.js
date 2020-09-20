import Blog from "../models/Blog";
import { pick } from 'lodash';

export default new class BlogController {
    async save(req, res){
        try {
            const blog = pick(req.body, ['title','desc','intro','content']);
            const savedBlog = Blog.save(blog);
            return res.status(202).send({
                message: "Blog was successfully created",
                blog: {
                    savedBlog
                }
            })
        } catch (e) {
            return res.status(400).send({
                message: e.message
            })
        }
    }
    getAll(req, res) {
        const blogs = Blog.getAll();
        return res.status(200).send({
            message: "Operation Succesfull",
            data : {
                blogs
            }
        })
    }
    getById(req, res) {
        const blogId = req.params.id;
        const blog = Blog.findBlogById(blogId);
        return res.status(200).send({
            message: "The blog was found",
            data: {
                blog
            }
        })
    }
    delete(req, res){
        const blogTitle = req.params.title
        if(!Blog.findBlogByTitle(blogTitle)){
            return res.status(404).send({
                message: "Blog with provided id does not exist"
            })
        }
        Blog.deleteBlog(blogTitle);
        return res.status(200).send({
            status: 200,
            message: "The blog was deleted",
        })
    }
    update(req, res){
        const blogTitle = req.params.title


        if(!Blog.findBlogByTitle(blogTitle)){
            return res.status(404).send({
                message: "Blog with provided id does not exist"
            })
        }
        const blog = pick(req.body, ['title','desc','intro','content']);
        try{
            Blog.updateBlog(blogTitle,blog);
            return res.status(204).send({
                status: 204,
                message: "The blog was Updated!!",
            })
        }catch (e) {
            return res.status(400).send({
                message: e.message
            })
        }
        
    }

}
