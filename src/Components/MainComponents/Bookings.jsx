import React, { Component } from 'react';
import { Redirect,Link, Router, Switch, Route } from 'react-router-dom';
import BookedTickets from './BookedTickets'
import axios from "axios";
import OutDatedTickets from './OutDatedTickets';
import CanceledTickets from './CanceledTickets';
import NavBar from '../NavBarComponent/NavBar';
import ContactUs from './ContactUs';
class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            ticketData:null,
            success:null,
         }
        //  if(sessionStorage.getItem('User')){
        //     axios.get('http://localhost:4200/bookedTickets',{
        //         params:{
        //             name:this.state.userData.name,
        //         }
        //     }).then((res)=>{
        //         console.log(res.data)
        //         this.setState({ticketData:res.data})
        //     })
        // }
    }
  
    render() { 
        if(this.state.userData==null || Object.keys(this.state.userData).length==0){
            return <Redirect to="/login"/>
        }
        return ( 
            <div class="ui container" style={{marginTop:'2%'}}>
                <div class="ui buttons" style={{marginBottom:'3%'}}>
                    <Link class="ui inverted primary button" to="/bookings">Upcoming</Link>
                    <Link class="ui inverted primary button" to="/canceledTickets">Canceled</Link>
                    <Link class="ui inverted primary button" to="/outdatedTickets">Completed</Link>
                </div>
                <Switch>
                    <Route exact path="/bookings">
                        <BookedTickets/>
                    </Route>
                    <Route exact path="/canceledTickets">
                        <CanceledTickets/>
                    </Route>
                    <Route exact path="/outdatedTickets">
                        <OutDatedTickets/>
                    </Route>
                </Switch>
                
            </div>
         );
    }
}
 
export default Bookings;