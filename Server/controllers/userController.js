import User from '../models/User';
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';

export default new class userController {
    async save(req,res){
        try {
            const user = new User(req.body);
            await user.save();
            const authToken = await user.generateAuthToken()
            return res.status(202).send({
                message: 'User created',
                data: {
                    userEmail : user.email,
                    authToken
                }
            })
        } catch (error) {
            return res.status(400).send({
                message: 'Unable to create a user',
                Error: error.message
            })
        }
            
    }
    async update(req, res){
        const user = await User.findById({_id:req.params.id})
        const AllowedUpdates = ['fullName','username','password','email','avatar']
        const updates = Object.keys(req.body)
        const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(404).send({
                message: 'Invalid Data Fields Present'
            })
        }
        try {
            updates.forEach((update) => {
                user[update] = req.body[update]
            })
            await user.save()
            if(!user){
                return res.status(404).send({message:'An error occured'})
            }
            return res.status(200).send({
                message: 'The blog was modified',
                data: {
                    user
                }})
        } catch (error) {
            return res.status(400).send({
                message: error.message
            })
        }
    }
    async getAll(req, res) {
        const users = await User.find({}, {avatar: 0})
        return res.status(200).send({
            message: "Operation Succesfull",
            data : {
                users
            }
        })
    }
    async getProfilePicture(req, res){
        try{
            const user = await User.findOne({_id: req.params.id})
            if(!user || !user.avatar){
                throw new Error()
            }
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(user.avatar)
        }catch(e){
            return res.status(500).send({
                message: 'An error occured',
                error: e.message
            })
        }
    }
}