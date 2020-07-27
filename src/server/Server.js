const express=require("express")
const app=express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*this below code is very Important to prevent CORS error in my task*/ 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

server=app.listen(process.env.PORT | 4200 ,()=>{
    console.log("Connected to the server...",process.env.PORT | 4200);
})

const mongo=require('mongoose');
//const { data } = require("jquery");
var Schema = mongo.Schema;
mongo.connect('mongodb://localhost:27017/BusBookingApp', {useNewUrlParser: true});

const db=mongo.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

userModel=new Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
  });

var User = mongo.model('user',userModel,'User');
app.post('/register',(req,res)=>{
    //console.log(req.body)
    iname=req.body.User.username
    iemail=req.body.User.email
    iphone=req.body.User.phone
    iaddress=req.body.User.address
    ipassword=req.body.User.password
    console.log(req.body.User)
    User.findOne({$or:[{name:iname},{email:iemail}]},(err,result)=>{
        console.log(result)
        if(result==null){
            data=new User({
                name:iname,
                email:iemail,
                password:ipassword,
                phone:iphone,
                address:iaddress
            })
            data.save()
            console.log(data)
            res.status(200).send(data)
        }
        else{
            res.status(200).send([])
        }
        })
    
})

app.post('/login',(req,res)=>{
    iname=req.body.User.username
    ipassword=req.body.User.password

    User.findOne({$or:[{name:iname},{email:iname}],password:ipassword},(err,result)=>{
        //console.log(result)
        res.status(200).send(result)
        })
})