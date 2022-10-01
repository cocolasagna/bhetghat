const Post = require('../model/post');
const path = require('path')
const auth = require('./auth');
const User = require('../model/register');


const getAllPost  = async(req,res,next)=>{
const user = req.user
    let posts;
    try{

        posts = await Post.find();

       
    }catch(err){
        console.log(err)
    }
    if(!posts){
        console.log('no posts')
    }
    return res.status(200).json({posts})
}




//Adding a new post 
const addposts = async (req,res,next)=>{
    const {title, description,image}=req.body
    const username = req.user
const addpost = new Post({
        title,description,image,
    user:username
    })
    try{
           await addpost.save()
           res.status(201).redirect('/post');
    }catch(err){
        console.log(err)
    }
    return res.status(200)
}




const timeline = async(req,res,next)=>{
    res.sendFile(path.join(__dirname , "..", 'frontend' , 'Post.html'))
}



const updatepost = async(req,res,next)=>{
    res.sendFile(path.join(__dirname , "..", 'frontend' , 'update.html'))
}


module.exports ={getAllPost, addposts, timeline };