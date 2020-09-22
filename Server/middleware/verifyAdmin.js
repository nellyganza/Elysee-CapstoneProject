import 'dotenv/config'

const checkAdmin = async (req, res, next) => {
    console.log(process.env.ADMIN_EMAIL);
    try {
        if(!req.user.email){
            throw new Error()
        }
        if(process.env.ADMIN_EMAIL.includes(req.user.email)){
            next();
        }
        else
        {
            return res.status(401).send({
                message: 'Your are not Admin'
            })
        }
    } catch (error) {
        return res.status(401).send({
            message: 'Please Authenticate'
        })
    }

}

export default checkAdmin