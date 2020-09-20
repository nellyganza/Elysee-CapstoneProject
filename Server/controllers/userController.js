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
}