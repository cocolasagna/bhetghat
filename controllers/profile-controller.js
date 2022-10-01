const Post = require('../model/post')
const User = require('../model/register')


const Profile  = async(req,res,next)=>{
    const user = req.user
    const username =req.params.username
if(username == user)  {
        let posts;
        try{
    
            posts = await Post.find({user : user});
    
           
        }catch(err){
            console.log(err)
        }
        if(!posts){
            console.log('no posts')
        }
        return res.status(200).json({posts})
    }
    else{
          console.log("Not your profile")
    }
    
}

const searchProfile = async(req,res,next)=>{
    const username = req.params.username
    let posts,user;
    try{
            user = await User.findOne({username:username})
        if(user)
            { posts = await Post.find({user:username})
            const {password,email,tokens,_id, ...other} =user._doc
            console.log(other.username, user.fullname)
            return res.status(200).json({ other,posts})
           
            }
            
            else{
                res.status(404)
                console.log('no user found')
            }
}catch(err){
        console.log(err)
    }
   
    
    
}


//followUser


module.exports = {Profile,searchProfile};