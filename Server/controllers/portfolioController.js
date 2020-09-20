import Portfolio from "../models/Portfolio";
import { pick } from 'lodash';

export default new class PortfolioController {
    async save(req, res){
        const data = pick(req.body, ['Title','Description','link','photo'])
        console.log(data);
        const portfolio = new Portfolio(data)
        await portfolio.save()
            .then(item => {
            res.send("Portfolio save to database");
            })
            .catch(err => {
            res.status(400).send({
                message:err.message,
                code:err.code,
                newmessage:"unable to save to database"
            });
            });

    }
    async update(req, res){
        const portfolio = await Portfolio.findById({_id:req.params.id})
        const AllowedUpdates = ['Title','Description','link','photo']
        const updates = Object.keys(req.body)
        const isValidOperation = updates.every((update) => AllowedUpdates.includes(update))
        if(!isValidOperation){
            return res.status(404).send({
                message: 'Invalid Data Fields Present'
            })
        }
        try {
            updates.forEach((update) => {
                portfolio[update] = req.body[update]
            })
            await portfolio.save()
            if(!portfolio){
                return res.status(404).send({message:'An error occured'})
            }
            return res.status(200).send({
                message: 'The portfolio was modified',
                data: {
                    portfolio
                }})
        } catch (error) {
            return res.status(400).send({
                message: error.message
            })
        }
    }
}
