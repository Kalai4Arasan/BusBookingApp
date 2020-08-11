import React, { Component } from 'react';
import { Switch,Route,Link, Redirect } from 'react-router-dom';
import Mail from '../ContactComponent/Mail';
import Chat from '../ContactComponent/Chat';
class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
         }
    }
    render() { 
        if(this.state.userData==null || Object.keys(this.state.userData).length==0){
            return <Redirect to="/login"/>
        }
        return ( 
            <>
            <div class="ui container">  
                <div class="ui buttons">
                    <Link class="ui default button" to="/mail">Mail Us</Link>
                    <Link class="ui default button" to="/chat">ChatWithUs</Link>
                </div>
            </div>
            <div class="ui container segment">
            <Switch>
            <Route exact path="/contactus">
                <Mail/>
            </Route>
            <Route exact path="/mail">
                <Mail/>
            </Route>
            <Route exact path="/chat">
                <Chat/>
            </Route>
            </Switch>
            </div>
            </>
         );
    }
}
 
export default ContactUs;