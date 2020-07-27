import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import RegisterLogo from '../../assets/images/user-register.png'
import "./Register.css";
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:false,
            data:JSON.parse(sessionStorage.getItem('User')),
            username:null,
            email:null,
            phone:null,
            address:null,
            password:null,
            cpassword:null,
            errors:{
                username:null,
                email:null,
                phone:null,
                address:null,
                password:null,
                cpassword:null,   
            },
            ferror:null,
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
            case "address":
                this.state.errors.address=value!=null&&value.length>0 ?'':"Address Must be required";
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
        // console.log(this.state);
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        let valid=true

        for(let item of Object.values(this.state.errors)){
            if(item!=null && item.length>0 && item!='ferror'){
                valid=false
            }
        }
        if(valid===true && this.state.cpassword===this.state.password){
            const User=this.state
            console.log(User)
            axios.post('http://localhost:4200/register',{User}).then((res)=>{
                if(Object.keys(res.data).length>0){
                    sessionStorage.setItem('User',JSON.stringify(res.data));
                    this.setState({redirect:true})
                    }
                    else{
                        this.setState({ferror:"Username or Email is already present"})
                    }
            })
        }
        else{
            this.setState({ferror:'Passwords does not match each other!! '})
        }
    }
    render() { 
        if(this.state.redirect){
            return window.location.reload()
         }
         //console.log(this.state.data.length)
         if(this.state.data!=null && Object.keys(this.state.data).length>0){
             return <Redirect to="/"/>
         }
         else{
        return ( 
            <div class="ui grid">
                <div class="row">
                <div class="five wide column"></div>
                    <div class="five wide column ">
                    <h4 style={{display:'flex',alignItems:'center',justifyContent:'center'}}><img src={RegisterLogo} height="50" width="50"/>REGISTER PAGE</h4>
                        <form class="ui form cardform" onSubmit={this.handleSubmit}>
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
                                <label>Address</label>
                                <textarea type="text" style={{border: this.state.errors.address!=null && this.state.errors.address.length>0 ? '1px solid red':''}} onChange={this.handleData} name="address" rows="3" placeholder="Address" />
                                {this.state.errors.address!=null&&this.state.errors.address.length>0?<span class="alert-message">{this.state.errors.address}</span>:null}
                            </div>
                            <div class="field">
                                <label>Password</label>
                                <input type="password" style={{border: this.state.errors.password!=null && this.state.errors.password.length>0 ? '1px solid red':''}} onChange={this.handleData} name="password" placeholder="Password"/>
                                {this.state.errors.password!=null && this.state.errors.password.length>0?<span class="alert-message">{this.state.errors.password}</span>:null}
                            </div>
                            <div class="field">
                                <label>Confirm Password</label>
                                <input type="password" style={{border: this.state.errors.cpassword!=null  && this.state.errors.cpassword.length>0 ? '1px solid red':''}} onChange={this.handleData} name="cpassword" placeholder="Confirm Password"/>
                                {this.state.errors.cpassword!=null && this.state.errors.cpassword.length>0?<span class="alert-message">{this.state.errors.cpassword}</span>:null}
                            </div>
                            {this.state.ferror!=null && this.state.ferror.length>0 && this.state.ferror.length>0?<span class="alert-message">{this.state.ferror}</span>:null}
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
}
 
export default Register;