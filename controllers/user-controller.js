const User = require('../model/register')
const bcrypt = require('bcrypt')
const path = require('path')

//UpdateUser
const updateUser = async(req,res,next)=>{
   // const user = req.user
   // const username =req.params.username
    
//if(username == user)  {
    
    if(req.body.password){
        try{
      //  const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hashSync(req.body.password, 12)
        
    }catch(err){console.log(err)}
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body,
        });
        console.log("Updated successfully")
        return res.status(200)
    }
    
        catch(err){console.log(err)}
}

//}
/*else {
    res.status(403).json("cannot update others account")
}*/


//DeleteUser
const deleteUser = async(req,res,next)=>{
    // const user = req.user
    // const username =req.params.username
     
 //if(username == user)  {
     
  
     try{
         await User.findByIdAndDelete(req.params.id)
         console.log("user has been Deleted successfully")
         return res.status(200)
     }
     
         catch(err){console.log(err)}
 }



 //Follow a User
const followUser = async(req,res,next)=>{
    if(req.body.userId !== req.params.id){
                    try{
                           
                           const user = await User.findById(req.params.id)
                           const currentUser = await User.findById(req.body.userId)
                           
                           if(!user.followers.includes(req.body.userId)){
                                await user.updateOne({ $push: { followers: req.body.userId }})
                                await currentUser.updateOne({$push:{ following:req.params.id }})
                                console.log("Successfully Followed")
                                 
                           }else{
                            console.log("Already followed")
                        
                           }
                    }catch(err){
                        console.log("failure")
                        console.log(err)
                    }
            
}
    else{
            console.log("cannot follow self")
    }
}


//Unfollow User
const unfollowUser = async(req,res,next)=>{
    if(req.body.userId !== req.params.id){
                    try{
                           
                           const user = await User.findById(req.params.id)
                           const currentUser = await User.findById(req.body.userId)
                           
                           if(user.followers.includes(req.body.userId)){
                                await user.updateOne({ $pull: { followers: req.body.userId }})
                                await currentUser.updateOne({$pull:{ following:req.params.id }})
                                console.log("Successfully UnFollowed")
                                 
                           }else{
                            console.log("You donot follow this user")
                        
                           }
                    }catch(err){
                        console.log("failure")
                        console.log(err)
                    }
            
}
    else{
            console.log("cannot follow self")
    }
}


module.exports = {updateUser, deleteUser,followUser, unfollowUser}