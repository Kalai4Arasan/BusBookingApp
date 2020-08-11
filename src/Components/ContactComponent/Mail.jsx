import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            subject:null,
            content:null,
            success:null,
            errors:{
                subject:null,
                content:null,
            }
         }
    }

    handleChange=(e)=>{
        const name=e.target.name
        const value=e.target.value
        switch(name){
            case "subject":
                this.state.errors.subject=value.length>0?'' :"this field must be required"
                break
            case "content":
                this.state.errors.content=value.length>0?'' :"this field must be required"
                break
        }
        this.setState({[name]:value})
    }
    handleSubmit=()=>{
        console.log("hi")
        let valid=true
        // console.log(this.state)
        for(let item of Object.values(this.state.errors)){
            if(item===null || item.length>0){
                valid=false
            }
        }
        if(valid===true){
            const Mail ={
                'usermail':this.state.userData.email,
                'subject':this.state.subject,
                'content':this.state.content
            }
            axios.post('http://localhost:4200/mail',{Mail}).then((res)=>{
                console.log(res.data)
                if(Object.keys(res.data).length>0){
                    this.setState({success:'Successfully your mail has been sent to the Admin'})
                    document.getElementById('subject').value=""
                    document.getElementById('content').value=""
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                }
            })
        }
    }

    render() { 
        return ( 
            <div class="ui form">
                <h3 style={{textAlign:'center'}}>Contact Via Mail</h3><hr style={{marginBottom:'2%'}}/>
            {this.state.success!=null?<h3 style={{textAlign:'center',color:'#468847',fontWeight:'800',padding:'1%',borderRadius:'1rem',border:'#d6e9c6',background:'#dff0d8'}}>{this.state.success}</h3>:null}
            <div class="field">
                <label>UserMail :</label>
                <input type="text" name="mail" placeholder="mail" value={this.state.userData.email} readOnly/>
            </div>
            <div class="field">
                <label>Subject :</label>
                <input type="text" id="subject" style={{border: this.state.errors.subject!=null && this.state.errors.subject.length>0 ? '1px solid red':''}} onChange={this.handleChange}  name="subject" placeholder="subject" />
            </div>

            <div class="field">
                <label>Content :</label>
                <textarea type="text" id="content" style={{border: this.state.errors.content!=null && this.state.errors.content.length>0 ? '1px solid red':''}} onChange={this.handleChange}  name="content" placeholder="content" />
            </div>
            <button class="ui primary button" onClick={()=>this.handleSubmit()} style={{marginRight:'45%',marginLeft:'45%'}}>Send</button>
                
            </div>
         );
    }
}
 
export default Mail;