require('dotenv').config()
const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");
const jwt = require('jsonwebtoken');
const { response } = require('express');


//User Scheme
const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
       // required:true
    },
    followers:{
        type:Array
    },
    following:{
        type:Array
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]




})

UserSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.Secret_Key);
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){

    }
}


UserSchema.methods.AuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()}, process.env.Secret_Key);
        this.tokens = this.tokens.concat({token:token})
        return token;
    }catch(error){

    }
}

const User = new mongoose.model("User", UserSchema)

module.exports =User;
