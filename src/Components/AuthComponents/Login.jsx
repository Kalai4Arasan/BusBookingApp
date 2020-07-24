import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route} from 'react-router-dom';
import './Login.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:null,
            password:null,
            errors:{
                username:null,
                password:null,  
            }
         }
    }

    handleData=(e)=>{
        e.preventDefault()
        let inputname=e.target.name
        let value=e.target.value
        switch(inputname){
            case "username":
                this.state.errors.username=value!=null && value.length>0 ?'':"Name Filed Must be required";
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

    render() { 
        return ( 
            <div class="ui grid">
                <div class="row">
                <div class="five wide column"></div>
                    <div class="five wide column">
                    <h4 style={{textAlign:'center'}}>LoginPage</h4>
                        <form class="ui form" style={{padding:'15%',borderRadius:'10px',border:'1px solid grey'}}>
                            <div class="field">
                                <label>UserName</label>
                                <input type="text" style={{border: this.state.errors.username!=null && this.state.errors.username.length>0 ? '1px solid red':''}} onChange={this.handleData} name="username" placeholder="Email or UserName"/>
                                {this.state.errors.username!=null && this.state.errors.username.length>0?<span class="alert-message">{this.state.errors.username}</span>:null}
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input type="text" style={{border: this.state.errors.password!=null && this.state.errors.password.length>6 && this.state.errors.password.length>0 ? '1px solid red':''}} onChange={this.handleData} name="password" placeholder="Password"/>
                                {this.state.errors.password!=null && this.state.errors.password.length>6 && this.state.errors.password.length>0?<span class="alert-message">{this.state.errors.password}</span>:null}
                            </div>
                            <button class="ui primary button" style={{marginLeft:'35%',marginRight:'35%'}} type="submit">Login</button>
                            <hr/>
                            <Router>
                            <h6  style={{textAlign:'center',color:'green',fontSize:'10px'}}>Create Account <a href="/register" style={{textDecoration:'underline'}}>click here</a></h6>
                            </Router>
                        </form>
                    </div>
                <div class="five wide column"></div>
                </div>
            </div>
         );
    }
}
 
export default Login;