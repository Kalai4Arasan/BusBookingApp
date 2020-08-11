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




const mongo=require('mongoose');
var Schema = mongo.Schema;
mongo.connect('mongodb://localhost:27017/BusBookingApp', {useNewUrlParser: true,useUnifiedTopology: true});

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
    userid:String,
    busid:String,
    busname:String,
    date:Date,
    from:String,
    seats:Array,
    to:String,
    totalrate:Number,
    rated:Number,
})

canceledTicketsModel=new Schema({
    user:String,
    userid:String,
    busid:String,
    busname:String,
    date:Date,
    from:String,
    seats:Array,
    to:String,
    totalrate:Number,
    rated:Number,
})

var Bus=mongo.model('bus',busModel,'Buses');
var User = mongo.model('user',userModel,'User');
var Admin=mongo.model('admin',adminModel,'Admin')
var Tickets=mongo.model('tickets',ticketsModel,'Tickets')
var CanceledTickets=mongo.model('canceledtTickets',canceledTicketsModel,'CanceledTickets')
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
    iuserid=req.body.passData.userid
    ibusid=req.body.passData.busid
    ibusname=req.body.passData.busname
    ifrom=req.body.passData.from
    ito=req.body.passData.to
    idate=req.body.passData.date
    iseats=req.body.passData.seats
    irate=req.body.passData.totalrate
    let ticket=new Tickets({
        user:iuser,
        userid:iuserid,
        busid:ibusid,
        busname:ibusname,
        from:ifrom,
        to:ito,
        date:idate,
        seats:iseats,
        totalrate:irate,
        rated:0,
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
    id=req.query.userid
    now=Date.now()
    Tickets.find({userid:id},(err,result)=>{
        doc=[]
        result.forEach(item=>{
            if(new Date(item.date).getTime()>=now){
                doc.push(item)
            }
        })
        return res.send(doc)
    })
})

app.get('/outDatedTickets',(req,res)=>{
    id=req.query.userid
    now=Date.now()
    Tickets.find({userid:id},(err,result)=>{
        doc=[]
        result.forEach(item=>{
            if(new Date(item.date).getTime()<now){
                doc.push(item)
            }
        })
        return res.send(doc)
    })
})

app.get('/canceledTickets',(req,res)=>{
    id=req.query.userid
    CanceledTickets.find({userid:id},(err,result)=>{
        console.log(result)
        return res.send(result)
    })
})

app.get('/cancelTicket',(req,res)=>{
    id=req.query.id
    // console.log(id)
    Tickets.find({_id:id},(err,result)=>{
        //console.log(result[0])
        let data=new CanceledTickets({
            user:result[0].user,
            userid:result[0].userid,
            busid:result[0].busid,
            busname:result[0].busname,
            date:result[0].date,
            from:result[0].from,
            seats:result[0].seats,
            to:result[0].to,
            totalrate:result[0].totalrate,
            rated:result[0].rated,
        })
        data.save()
    })

    Tickets.deleteOne({_id:id},(err,result)=>{
        return res.send(result)
    })
})

app.get('/rateBus',(req,res)=>{
    tid=req.query.tid
    busid=req.query.busid
    rating=req.query.rating
    console.log(req.query)
    Bus.findOne({_id:busid},(er,result)=>{
        let preRate=result.rating
        Bus.updateOne({_id:busid},{rating:(preRate+rating)%5},(err,result)=>{
            console.log(result)
        })
        Tickets.updateOne({_id:tid},{rated:1},(err,result)=>{
            console.log(result)
        })
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


//Mail sending Details...
const nodemailer = require("nodemailer");

app.post('/mail',async (req,res)=>{
    usermail=req.body.Mail.usermail
    subject=req.body.Mail.subject
    content=req.body.Mail.content
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
        user: 'natasha.hettinger@ethereal.email',
        pass: 'PRFQzacd6Eedw8svwm'
    },
  });
  let info = await transporter.sendMail({
    from: usermail, 
    to: 'natasha.hettinger@ethereal.email', 
    subject: subject, 
    html: content, 
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return res.send({'status':'success'});
})

server=app.listen(process.env.PORT | 4200 ,()=>{
    console.log("Connected to the server...");
})

  
//Chat with Admin
//console.log(server)
const socket=require('socket.io')(server);
socket.on('connect',(e)=>{
    //console.log(e)
    console.log('Your Now Connected...');
});
 