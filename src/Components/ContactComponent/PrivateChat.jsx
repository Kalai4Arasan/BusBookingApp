import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import io from 'socket.io-client';
import Axios from 'axios';
const socket = io('http://localhost:4200');
let input=""
let c=0

const PrivateChat =function() {
    const Data=useLocation()
    let data=Data.state.chat
    let adminData=Data.state.admin
    let m=null
    let [messages,setMessages]=useState([])
    Axios.get('http://localhost:4200/messages',{params:{id:data.userid}}).then((res)=>{
        setMessages(res.data)
    })

    const handleChange=()=>{
        input=document.getElementById('input').value
        console.log(document.getElementById('input').value)
    }
    const handleSubmit=(val)=>{
        socket.emit('JoinRoom',data.userid,adminData.name)
        socket.on("new-message",(data)=>{
            setMessages(messages.push({'message':data[0],'name':data[1]}))
        })
        document.getElementById("input").value=""
        socket.emit('message',[val,adminData.name])
        setMessages(messages.push({'message':val,'name':adminData.name}))
        console.log(messages)
    }

    return ( 
            <div>
                <h3 style={{textAlign:'center'}}>Chat With {data.username}</h3><hr style={{marginBottom:'2%'}}/>
                <div style={{height:'390px',overflowY:'scroll',background:'#bff5cd'}}>
                    <div class="ui relaxed divided list">
                    {messages.length>0?messages.map((item)=><div class="item" style={{padding:'1rem'}}><div class="content"><p class="header">{item.name}</p><div class="description">{item.message}</div></div></div>):<h3 style={{textAlign:'center',marginTop:'1rem'}}>Welcome {adminData.name}</h3>}
                    </div>
                </div>
                <div class="ui form " style={{position:'fixed',bottom:'10px'}}>
                    <div class="fields" style={{marginLeft:'30%'}}>
                        <div class="field">
                            <input id="input" onChange={()=>handleChange()} style={{width:'600px',border:'1px solid yellow'}} placeholder="Enter You message here..." name="message"/>
                        </div>
                        <div class="field">
                            <button onClick={()=>handleSubmit(input)} class="ui primary button">send</button>
                        </div>
                    </div>
                </div>
            </div>
     );
}
 




export default PrivateChat;