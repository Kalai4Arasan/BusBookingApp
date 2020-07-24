import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route} from 'react-router-dom';
import "./Register.css";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username:null,
            email:null,
            phone:null,
            password:null,
            cpassword:null,
            errors:{
                username:null,
                email:null,
                phone:null,
                password:null,
                cpassword:null,   
            }
         }

    }

    validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );

    handleData=(e)=>{
        e.preventDefault()
        let inputname=e.target.name
        let value=e.target.value
        switch(inputname){
            case "username":
                this.state.errors.username=value!=null&&value.length>0 ?'':"Name Must be required";
                break
            case "email":
                this.state.errors.email=value!=null&& this.validEmailRegex.test(value)&&value.length>0 ?'':"Email is invalid";
                break
            case "phone":
                this.state.errors.phone=value!=null&&value.length===10 ?'':"Mobile number must be ten digit";
                break
            case "password":
                this.state.errors.password=value!=null&&value.length>6 ?'':"Password must be atleast 6 character";
                break
            case "cpassword":
                this.state.errors.cpassword=value!=null&&value.length>6 ?'':"Password must be atleast 6 character";
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
                        <h4 style={{textAlign:'center'}}>RegisterPage</h4>
                        <form class="ui form" style={{padding:'15%',borderRadius:'10px',border:'1px solid grey'}}>
                            <div class="field">
                                <label>UserName</label>
                                <input type="text" style={{border: this.state.errors.username!=null && this.state.errors.username.length>0 ? '1px solid red':''}} onChange={this.handleData} name="username" placeholder="UserName" />
                                {this.state.errors.username!=null&&this.state.errors.username.length>0?<span class="alert-message">{this.state.errors.username}</span>:null}
                            </div>
                            <div class="field">
                                <label>Email Address</label>
                                <input type="text" style={{border: this.state.errors.email!=null && this.state.errors.email.length>0 ? '1px solid red':''}} onChange={this.handleData} name="email" placeholder="Email Address"/>
                                {this.state.errors.email!=null && this.state.errors.email.length>0?<span class="alert-message">{this.state.errors.email}</span>:null}
                            </div>
                            <div class="field">
                                <label>Phone Number</label>
                                <input type="text" style={{border: this.state.errors.phone!=null && this.state.errors.phone.length>0 ? '1px solid red':''}} onChange={this.handleData} name="phone" placeholder="Phone Number"/>
                                {this.state.errors.phone!=null && this.state.errors.phone.length>0?<span class="alert-message">{this.state.errors.phone}</span>:null}
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input type="password" style={{border: this.state.errors.password!=null && this.state.errors.password.length>0 ? '1px solid red':''}} onChange={this.handleData} name="password" placeholder="Password"/>
                                {this.state.errors.password!=null && this.state.errors.password.length>0?<span class="alert-message">{this.state.errors.password}</span>:null}
                            </div>
                            <div class="field">
                                <label>Confirm Password</label>
                                <input type="text" style={{border: this.state.errors.cpassword!=null  && this.state.errors.cpassword.length>0 ? '1px solid red':''}} onChange={this.handleData} name="cpassword" placeholder="Confirm Password"/>
                                {this.state.errors.cpassword!=null && this.state.errors.cpassword.length>0?<span class="alert-message">{this.state.errors.cpassword}</span>:null}
                            </div>
                            <button class="ui positive button" style={{marginLeft:'35%',marginRight:'35%',marginTop:'2%',marginBottom:'2%'}} type="submit">Register</button>
                            <hr/>
                            <Router>
                            <h6  style={{textAlign:'center',color:'grey',fontSize:'10px'}}>Back to <a href="/login" style={{textDecoration:'underline'}}>Login Page</a></h6>
                            </Router>
                        </form>
                    </div>
                <div class="five wide column"></div>
                </div>
            </div>
         );
    }
}
 
export default Register;