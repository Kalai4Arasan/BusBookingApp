import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import LoginLogo from '../../assets/images/user-login.png';
class LoginAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:false,
            adminname:null,
            password:null,
            errors:{
                adminname:null,
                password:null, 
            },
            ferror:null,
            data:JSON.parse(sessionStorage.getItem('Admin')),
         }
    }

    handleData=(e)=>{
        e.preventDefault()
        let inputname=e.target.name
        let value=e.target.value
        switch(inputname){
            case "adminname":
                this.state.errors.adminname=value!=null && value.length>0 ?'':"Name Field Must be required";
                break
            case "password":
                this.state.errors.password=value!=null && value.length>6 ?'':"Password must be atleast 6 character";
                break
            default:
                break
        }
        this.setState({[inputname]:value})
        //console.log(this.state);
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        let valid=true

        for(let item of Object.values(this.state.errors)){
            if(item!=null && item.length>0){
                valid=false
            }
        }
        if(valid===true){
            const Admin=this.state
            axios.post('http://localhost:4200/loginAdmin',{Admin}).then((res)=>{
                if(Object.keys(res.data).length>0){
                sessionStorage.setItem('Admin',JSON.stringify(res.data));
                this.setState({redirect:true})
                }
                else{
                    this.setState({ferror:"Invalid Adminname or Password"})
                }
            })
        }
    }

    render() { 
        if(this.state.redirect){
           return window.location.reload()
        }
        if(this.state.data!=null && Object.keys(this.state.data).length>0){
            return <Redirect to="/admin"/>
        }
        else{
        return ( 
            <div class="ui grid">
                <div class="row">
                <div class="five wide column"></div>
                    <div class="five wide column">
                    <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={LoginLogo} height="50" width="50"/>ADMIN LOGIN PAGE</h4>
                        <form class="ui form cardform" onSubmit={this.handleSubmit} >
                            <div class="field">
                                <label>AdminName</label>
                                <input type="text" style={{border: this.state.errors.adminname!=null && this.state.errors.adminname.length>0 ? '1px solid red':''}} onChange={this.handleData} name="adminname" placeholder="Email or adminName"/>
                                {this.state.errors.adminname!=null && this.state.errors.adminname.length>0?<span class="alert-message">{this.state.errors.adminname}</span>:null}
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input type="password" style={{border: this.state.errors.password!=null && this.state.errors.password.length>0 ? '1px solid red':''}} onChange={this.handleData} name="password" placeholder="Password"/>
                                {this.state.errors.password!=null && this.state.errors.password.length>6 && this.state.errors.password.length>0?<span class="alert-message">{this.state.errors.password}</span>:null}
                            </div>
                            {this.state.ferror!=null && this.state.ferror.length>6 && this.state.ferror.length>0?<span class="alert-message">{this.state.ferror}</span>:null}
                            <button class="ui primary button" style={{marginLeft:'35%',marginRight:'35%'}} type="submit">Login</button>
                            <hr/>
                            <h3 style={{textAlign:'center'}}>Welcome to admin panel</h3>
                        </form>
                    </div>
                <div class="five wide column"></div>
                </div>
            </div>
         );
        }
    }
}
 
export default LoginAdmin;