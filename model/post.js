const mongoose = require('mongoose')




const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:String,
        required:true,
    }
})

const Post= new mongoose.model("Post", PostSchema)
module.exports = Post