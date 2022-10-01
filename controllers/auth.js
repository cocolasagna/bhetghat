const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const User = require('../model/register')


const auth = async (req,res,next)=>{
        try{

            const token =  req.cookies.jwt
        
            const verifyUser = jwt.verify(token, process.env.Secret_Key)
            const loggedUser =  await User.findOne({_id:verifyUser._id})
            const user = loggedUser.username
            const id = loggedUser.id
            req.user = user
            req.id = id
    
                next()
           
        }catch(err){
            res.status(401).send(err)
        }

}


module.exports = auth; 
