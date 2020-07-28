import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User'))
         }
    }
    render() { 
        if(this.state.userData==null || Object.keys(this.state.userData).length==0){
            return <Redirect to="/login"/>
        }
        return ( <h1>
            Bookings
        </h1> );
    }
}
 
export default Bookings;