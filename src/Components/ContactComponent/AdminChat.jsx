import React, { Component } from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom';
import axios from "axios";
import chat from '../../assets/images/chat.png'
import io from 'socket.io-client';
import PrivateChat from './PrivateChat';
class AdminChat extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            adminData:JSON.parse(sessionStorage.getItem('Admin')),
            chats:[],
            chatBox:null,
            m:null,
            messages:[],
        }
        if(this.state.adminData!=null){
        axios.get('http://localhost:4200/getChats').then((res)=>{
            console.log(res.data)
            this.setState({chats:res.data})
            // this.showChat(this.state.chats[0])
        })
        }
    }

    componentDidMount(){
    }
    render() { 
        if(this.state.adminData==null || Object.keys(this.state.adminData).length==0){
            return <Redirect to="/loginAdmin"/>
        }
        return ( 
            <div class="ui grid" style={{height:'545px',display:'flex',marginTop:'-14px'}}>
                <div class="three wide column" style={{overflowY:'scroll',background:'grey',color:'white'}}>
                <h3 style={{textAlign:'center'}}>Chat User</h3><hr/>
                    <div class="ui middle aligned selection list">
                        {this.state.chats.map(item=>{
                            return(
                                <Link to={{ pathname: '/privateChat', state: { chat:item,admin:this.state.adminData} }}>
                                    <div class="item" style={{display:'flex',marginLeft:'15px'}}>
                                        <img class="ui avatar image" src={chat}/>
                                        <div class="content">
                                        <div class="header" style={{color:'white'}}>{item.username}</div>
                                        </div>
                                    </div>
                                </Link>
                            ) 
                        })}
                    </div>
                </div>
                <div class="thirteen wide column" style={{overflowY:'scroll'}}>
                <Switch>
                    <Route exact path="/privateChat">
                        <PrivateChat/>
                    </Route>
                </Switch>
                </div>
            </div>
         );
    }
}
 
export default AdminChat;