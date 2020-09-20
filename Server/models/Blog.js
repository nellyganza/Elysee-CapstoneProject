import {v4  as uuidv4} from 'uuid';
import {remove} from 'lodash';

export default new class Blog {
    constructor(){
        this.blog = [];
    }
    save(blog){
        const IsExists = this.findBlogByTitle(blog.title);
        if(IsExists){
            throw new Error("Blog already exists")
        }
        const newBlog = {
           id: uuidv4(),
            Title: blog.title,
            description: blog.desc,
            createdAt: new Date(),
            introduction: blog.intro,
            content: blog.content
        }
           this.blog.push(newBlog)
           return newBlog
    }
   
       findBlogByTitle(title){
           return this.blog.find(blog => blog.Title === title)
       }
       findBlogById(id){
           return this.blog.find(blog => blog.id === id)
       }
       deleteBlog(title){
          remove(this.blog, (blog) => {
              return blog.Title === title
          })
       }
       getAll(){
           return this.blog;
       }
       updateBlog(blogTitle,blogs){
           console.log(this.blog[0].Title,blogTitle)
           var index = this.blog.findIndex(blog => blog.Title === blogTitle);
           console.log(index);
           if(index != -1)
           {
            const newBlog = {
                id: this.blog[index].id,
                 Title: blogs.title,
                 description: blogs.desc,
                 createdAt: this.blog[index].createdAt,
                 introduction: blogs.intro,
                 content: blogs.content
             }
             this.blog.splice(index, 1, newBlog);
           }
           else
           {
               throw  new Error("The Blog index  not Found !!");
           }
           
       }
}