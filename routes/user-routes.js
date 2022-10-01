const express = require('express')
const bodyParser = require('body-parser')
const userRouter = express.Router()
const controls = require('../controllers/user-controller')
const auth = require('../controllers/auth')



//update User
userRouter.put("/:id", controls.updateUser)
//delete User
userRouter.delete("/:id", controls.deleteUser)
//follow User
userRouter.put("/:id/follow", controls.followUser)
//Unfollow User
userRouter.put("/:id/unfollow",controls.unfollowUser)

module.exports = userRouter