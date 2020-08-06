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
const { data } = require("jquery");
const { default: Axios } = require("axios");
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

adminModel=new Schema({
    name:String,
    email:String,
    password:String,
    phone:Number,
    address:String,
});


busModel=new Schema({
    busname:String,
    from:String,
    to:Object,
    type:String,
    rating:Number,
});

ticketsModel=new Schema({
    user:String,
    busid:String,
    busname:String,
    date:Date,
    from:String,
    seats:Array,
    to:String,
    totalrate:Number,
})
var Bus=mongo.model('bus',busModel,'Buses');
var User = mongo.model('user',userModel,'User');
var Admin=mongo.model('admin',adminModel,'Admin')
var Tickets=mongo.model('tickets',ticketsModel,'Tickets')
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
            let data=new User({
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

app.post("/available",(req,res)=>{
    ifrom=req.body.Data.from,
    ito=req.body.Data.to,
    idate=req.body.Data.date,
    Bus.find({from:ifrom},(err,result)=>{
        let d=[];
        for(let i of result){
            let fl=false;
            i['to'].forEach((item)=>{
                if(item[0]===ito){
                    fl=true;
                }
            })
            if(fl==true){
                d.push(i)
            }
        }
        return res.send(d)
    })
})

app.post('/booktickets',(req,res)=>{
    iuser=req.body.passData.user
    ibusid=req.body.passData.busid
    ibusname=req.body.passData.busname
    ifrom=req.body.passData.from
    ito=req.body.passData.to
    idate=req.body.passData.date
    iseats=req.body.passData.seats
    irate=req.body.passData.totalrate
    let ticket=new Tickets({
        user:iuser,
        busid:ibusid,
        busname:ibusname,
        from:ifrom,
        to:ito,
        date:idate,
        seats:iseats,
        totalrate:irate
    })
    ticket.save()
    return res.status(200).send(ticket)
})

app.post('/getSeats',(req,res)=>{
    ibusid=req.body.passData.busid
    ifrom=req.body.passData.from
    ito=req.body.passData.to
    idate=req.body.passData.date
    console.log(req.body.passData)
    Tickets.find({$and:[{busid:ibusid},{from:ifrom},{to:ito},{date:idate}]},(err,result)=>{
        seats=[]
        for(let i of result){
            i['seats'].forEach(item=>{
                seats.push(item)
            })
        }
        console.log(seats)
        res.status(200).send(seats)
        })
})

app.get('/bookedTickets',(req,res)=>{
    name=req.query.name
    Tickets.find({user:name},(err,result)=>{
        return res.send(result)
    })
})

app.get('/cancelTicket',(req,res)=>{
    id=req.query.id
    console.log(req)
    Tickets.deleteOne({_id:id},(err,result)=>{
        return res.send(result)
    })
})


app.post('/loginAdmin',(req,res)=>{
    iname=req.body.Admin.adminname
    ipassword=req.body.Admin.password
    console.log(req.body.Admin)
    Admin.findOne({$or:[{name:iname},{email:iname}],password:ipassword},(err,result)=>{
        console.log(result)
        res.status(200).send(result)
        })
})

app.get('/allBuses',(req,res)=>{
    Bus.find({},(err,result)=>{
        return res.send(result)
    })
})

app.post('/registerBus',(req,res)=>{
    ibusname=req.body.busData.busname
    ifrom=req.body.busData.from
    ito=req.body.busData.to
    itype=req.body.busData.type
    irating=req.body.busData.rating
    let data=new Bus({
        busname:ibusname,
        from:ifrom,
        to:ito,
        type:itype,
        rating:irating
    })
    data.save()
    return res.send(data)
})