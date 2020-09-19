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
    
}
