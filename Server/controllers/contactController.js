import Contact from "../models/Contact";
import { pick } from 'lodash';

export default new class contactController{
    async save(req, res){
        const data = pick(req.body, ['fullName','email','phone','address','message'])
        console.log(data);
        const contact = new Contact(data)
        await contact.save()
            .then(item => {
                res.send("Message Sent Successfully!!");
            })
            .catch(err => {
            res.status(400).send({
                message:err.message,
                code:err.code,
                newmessage:"unable to Send Message"
            });
            });

    }
    async getAll(req, res) {
        const contacts = await Contact.find({});
        return res.status(200).send({
            message: "Operation Succesfull",
            data : {
                contacts
            }
        })
    }
} 