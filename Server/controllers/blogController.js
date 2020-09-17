import Blog from "../models/Blog";
import { pick } from 'lodash';
import e from "express";

export default new class BlogController {
    async save(req, res){
        const data = pick(req.body, ['Title','Description','Introduction','Content','photo'])
        console.log(data);
        const blog = new Blog(data)
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
    async update(req, res){
        const blog = await Blog.findById({_id:req.params.id})
        console.log(blog)
        const AllowedUpdates = ['Title','Description','Introduction','Content','photo']
        const updates = Object.keys(req.body)
        console.log(updates)
        const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
        console.log(isValidOperation)
        if(!isValidOperation){
            return res.status(404).send({
                message: 'Invalid Data Fields Present'
            })
        }
        try {
            updates.forEach((update) => {
                blog[update] = req.body[update]
            })
            await blog.save()
            if(!blog){
                return res.status(404).send({message:'An error occured'})
            }
            return res.status(200).send({
                message: 'The blog was modified',
                data: {
                    blog
                }})
        } catch (error) {
            return res.status(400).send({
                message: error.message
            })
        }
        // const data = pick(req.body, ['Title','Description','Introduction','Content','photo']);
        // data.photo = req.photo;
        // console.log(data);
        // await Blog.findByIdAndUpdate(req.params.id,data)
        //     .then(item => {
        //     res.send("item update to database");
        //     })
        //     .catch(err => {
        //     res.status(400).send({
        //         message:err.message,
        //         code:err.code,
        //         newmessage:"unable to save to database"
        //     });
        //     });

    }

    async delete(req, res){
      try {
        const blog = await  Blog.findOne({_id: req.params.id})
        await blog.remove();
        return res.status(200).send({
            message: 'The blog was removed'
        })
      } catch (error) {
          return res.status(400).send({
              message: error.message
          })
      }
    }

    async getById(req, res) {
        try {
            const blog = await Blog.findById({_id: req.params.id}, {photo: 0})
            return res.status(200).send({
                message: 'Blog was found',
                data: {
                    blog
                }
            })
        } catch (error) {
            return res.status(400).send({
                message: error.message
            })
        }
       
        
    }
  
}
