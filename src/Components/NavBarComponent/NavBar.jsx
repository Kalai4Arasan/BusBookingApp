import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route} from 'react-router-dom';
import $ from 'jquery';

import Logo from "../../assets/images/logo.png"
import './NavBar.css'
import Home from '../MainComponents/Home';
import Bookings from '../MainComponents/Bookings';
import HireBus from '../MainComponents/HireBus';
import BookTickets from '../MainComponents/BookTickets';
import Login from '../AuthComponents/Login';
import Register from '../AuthComponents/Register';
import Profile from '../MainComponents/Profile';
import ShowAvailableBuses from '../TasksComponents/ShowAvailableBuses';
// import {ReactComponent as BusLogo} from '../../assets/svg/bus.svg';
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:JSON.parse(sessionStorage.getItem('User'))
         }
        //  console.log(this.state.data)
         this.button=this.state.data==null || Object.keys(this.state.data).length==0 ?
         <span class="ui item">
                     <div class="dropdown">
                         <span class="ui " ><i class="user icon"></i>Account </span>
                         <div class="dropdown-content">
                        <Link to="/login" >Login</Link>
                        <Link to="/register">SignUp</Link>
                         </div>
                      </div>
                 </span>
         :<span class="ui item">
                     <div class="dropdown">
                         <span class="ui"><i class="user icon"></i>{this.state.data.name} </span>
                         <div class="dropdown-content">
                          <Link to="/account" >Profile</Link>
                          <a onClick={this.logoutHandler} style={{cursor:'pointer'}}>LogOut</a>
                         </div>
                      </div>
                 </span>
    }
    logoutHandler=()=>{
        sessionStorage.removeItem('User');
        window.location.reload();
    }
    componentDidMount(){
        $("#buttonMenu").click(function (){
            if($("#sideMenu").css('display')=='none'){
                $("#buttonMenu").html('<i class="close icon"></i>Close');
            $("#sideMenu").css({'display':'block'}).addClass('animate__animated animate__slideInLeft');
            }
            else{
                $("#buttonMenu").html('<i class="th list icon"></i>Menu');
                $("#sideMenu").css({'display':'none'});
            }
        })
    }


    render() {
        return ( 
            <Router>
            <div class="ui grid computer only  inverted  menu" style={{borderRadius:'0',backgroundColor:'rgb(65, 64, 64)'}}>
            <img class="active item brand"style={{backgroundColor:'rgb(65, 64, 64)'}} src={Logo} height="80" width="100"/>
            <Link to="/" class=" active item brand-logo" style={{backgroundColor:'rgb(65, 64, 64)'}} >
            BookMyTrip
            </Link>
            <Link to="/booktickets" class="item">
                BookTickets
            </Link>
            <Link to="/bookings" class="item">
                Bookings
            </Link>
            <Link to="/hirebus" class="item">
                HireBus
            </Link>
            <div class="right menu">
               { this.button }
            </div>
            </div>
            <div class="ui grid mobile only" style={{borderRadius:'0',backgroundColor:'rgb(65, 64, 64)',margin:'0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                    <img class="brand"style={{backgroundColor:'rgb(65, 64, 64)'}} src={Logo} height="80" width="100"/>
                    <Link to="/" class="brand-logo2" style={{backgroundColor:'rgb(65, 64, 64)',color:'white'}} >
                    BookMyTrip
                    </Link>
                    </div>
            </div>
            <div class="ui grid mobile only">
                <button id="buttonMenu" class="ui secondary button"><i class="th list icon"></i>Menu</button>
            </div>
            <div id="sideMenu" class="ui grid mobile only inverted vertical menu" style={{backgroundColor:'rgb(65, 64, 64)',display:'none'}}>
                <Link to="/booktickets" class="item">
                    BookTickets
                </Link>
                <Link to="/bookings" class="item">
                    Bookings
                </Link>
                <Link to="/hirebus" class="item">
                    HireBus
                </Link>
            <div class="right">
                    <div class="item">
                    { this.button }
                    </div>
                    
                </div>
            </div>
        <Switch>
            <Route exact path="/">
                 <Home/> 
            </Route>
            <Route path="/booktickets">
                <BookTickets/>
            </Route>
            <Route path="/bookings">
                <Bookings/>
            </Route>
            <Route path="/hirebus">
                <HireBus/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
            <Route path="/account">
                <Profile/>
            </Route>
        </Switch>
        
        </Router>
         );
    }
}
 
export default NavBar;