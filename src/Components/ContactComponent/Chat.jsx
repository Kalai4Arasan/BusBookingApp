import React, { Component } from 'react';
import Axios from 'axios';
import $ from "jquery";
import io from 'socket.io-client';
const socket = io('http://localhost:4200');
class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            messages:[],
            m:null,
         }
        socket.connect()
        socket.emit("JoinRoom",this.state.userData._id,this.state.userData.name)
        socket.on("new-message",(data)=>{
            this.state.messages.push({'message':data[0],'name':data[1]})
            let mes=this.state.messages
            this.setState({messages:mes})
        })

        Axios.get('http://localhost:4200/messages',{
            params:{
                id:this.state.userData._id
            }
        }).then((res)=>{
            if(res.data.length>0){
                this.setState({messages:res.data})
            }
        })
    }
    handleChange=(e)=>{
        this.setState({m:e.target.value})
    }
    sendMessage=(message)=>{
        document.getElementById("inputBox").value=""
        this.state.messages.push({'message':message,'name':this.state.userData.name})
        let mes=this.state.messages
        this.setState({messages:mes})
        socket.emit('message',[message,this.state.userData.name])
    }
    componentDidMount(){
        window.onload=function () {
            var objDiv = document.getElementById("chatBox");
            objDiv.scrollTop = objDiv.scrollHeight;
       }
    }

    render() { 
        console.log(this.state.messages)
        return ( 
            <div>
                <h3 style={{textAlign:'center'}}>Chat With Admin</h3><hr style={{marginBottom:'2%'}}/>
                <div id="chatBox" style={{height:'370px',overflowY:'scroll',background:'#bff5cd',marginBottom:'45px'}}>
                    <div class="ui relaxed divided list" style={{marginBottom:'1%'}}>
                    {this.state.messages.length>0?this.state.messages.map((item)=><div class="item" style={{padding:'1rem'}}><div class="content"><p class="header">{item.name}</p><div class="description">{item.message}</div></div></div>):<h3 style={{textAlign:'center',marginTop:'1rem'}}>Welcome {this.state.userData.name}</h3>}
                    </div>
                </div>
                <div class="ui form " style={{position:'fixed',bottom:'10px'}}>
                    <div class="fields" style={{marginLeft:'30%'}}>
                        <div class="field">
                            <input id="inputBox" onChange={this.handleChange} style={{width:'600px',border:'1px solid yellow'}} placeholder="Enter You message here..." name="message"/>
                        </div>
                        <div class="field">
                            <button onClick={()=>this.sendMessage(this.state.m)} class="ui primary button send">send</button>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Chat;