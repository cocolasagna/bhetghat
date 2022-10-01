require('dotenv').config()
var express = require("express");
const mongoose = require ('mongoose');
const app = express();
const port = 3000;
const router = require('./routes/auth-routes');
const bodyParser = require('body-parser')
const Postrouter = require('./routes/post-routes')
const Profilerouter = require('./routes/profile-routes')
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user-routes')


app.use(cookieParser())
app.use(express.static('public'));
app.use (bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json())
app.use(router)

app.use("/post",Postrouter)
app.use('/profile',Profilerouter)
app.use('/user',userRouter)



//connecting to the database
mongoose.connect(
    process.env.conn_str,
    { 
  
    useNewUrlParser: true, 
    useUnifiedTopology: true ,

    },(err) => {
    if (err) {
    console.log(err);
    } else {
    console.log("mongodb is connected");
}})

mongoose.connection.once('open',() => { 
    app.emit('ready'); 
});

app.on('ready', function() { 
    app.listen(port, () => {
    console.log('Server started'); 
  });
});


//listening to the port
/*app.listen(port,()=>{
    console.log("Server started")
})
*/
//Routes
