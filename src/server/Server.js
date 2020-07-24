const express=require("express")
const app=express()
server=app.listen(process.env.PORT | 4200 ,()=>{
    console.log("Connected to the server...");
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
app.post('/signup',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    data=new User({
        name:'kalai',
        email:'kalai@gmail.com',
        password:'123456789',
        phone:1234567890,
        address:'Salem,Tamilnadu'
    })
    data.save()
    console.log("success");
})

app.get('/signin',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    User.findOne({name:})
    console.log("success");
})