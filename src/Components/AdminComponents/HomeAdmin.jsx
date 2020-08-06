import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch,Link,Route, useHistory} from 'react-router-dom';
import $ from 'jquery';
import { createBrowserHistory } from 'history';

import Logo from "../../assets/images/logo.png"
import '../NavBarComponent/NavBar.css'
import LoginAdmin from '../AuthComponents/LoginAdmin';
import ProfileAdmin from '../MainComponents/ProfileAdmin';
import AddBus from '../MainComponents/AddBus';
import Welcome from '../MainComponents/Welcome';
import ShowBuses from '../MainComponents/showBuses';
class HomeAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:JSON.parse(sessionStorage.getItem('Admin'))
         }
        //  console.log(this.state.data)
         this.button=this.state.data==null || Object.keys(this.state.data).length==0 ?
         <span class="ui item">
                     <div class="dropdown">
                         <span class="ui " ><i class="user icon"></i>Account </span>
                         <div class="dropdown-content">
                        <Link to="/loginAdmin" >Login</Link>

                         </div>
                      </div>
                 </span>
         :<span class="ui item">
                     <div class="dropdown">
                         <span class="ui"><i class="user icon"></i>{this.state.data.name} </span>
                         <div class="dropdown-content">
                          <Link to="/accountAdmin" >Profile</Link>
                          <a onClick={this.logoutHandler} style={{cursor:'pointer'}}>LogOut</a>
                         </div>
                      </div>
                 </span>
    }
    logoutHandler=()=>{
        sessionStorage.removeItem('Admin');
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
        console.log(this.state.data)
        return ( 
            <Router >
            <div class="ui grid computer only  inverted  menu" style={{borderRadius:'0',backgroundColor:'rgb(65, 64, 64)'}}>
            <img class="active item brand"style={{backgroundColor:'rgb(65, 64, 64)'}} src={Logo} height="80" width="100"/>
            <Link to="/admin" class=" active item brand-logo" style={{backgroundColor:'rgb(65, 64, 64)'}} >
            BookMyTrip
            </Link>
            <Link to="/addBus" class="item">
                    AddBus
            </Link>
            <Link to="/showBuses" class="item">
                    AllBuses
            </Link>
            <div class="right menu">
               { this.button }
            </div>
            </div>
            <div class="ui grid mobile only" style={{borderRadius:'0',backgroundColor:'rgb(65, 64, 64)',margin:'0'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                    <img class="brand"style={{backgroundColor:'rgb(65, 64, 64)'}} src={Logo} height="80" width="100"/>
                    <Link to="/admin" class="brand-logo2" style={{backgroundColor:'rgb(65, 64, 64)',color:'white'}} >
                    BookMyTrip
                    </Link>
                    </div>
            </div>
            <div class="ui grid mobile only">
                <button id="buttonMenu" class="ui secondary button"><i class="th list icon"></i>Menu</button>
            </div>
            <div id="sideMenu" class="ui grid mobile only inverted vertical menu" style={{backgroundColor:'rgb(65, 64, 64)',display:'none'}}>
                <Link to="/addBus" class="item">
                    AddBus
                </Link>
                <Link to="/showBuses" class="item">
                    AllBuses
                </Link>
            <div class="right">
                    <div class="item">
                    { this.button }
                    </div> 
                </div>
            </div>
            <Switch>
            <Route exact path="/admin">
                <Welcome/>
            </Route>
            <Route exact path="/addBus">
                <AddBus/>
            </Route>
            <Route exact path="/loginAdmin">
                <LoginAdmin/>
            </Route>
            <Route exact path="/accountAdmin">
                <ProfileAdmin/>
            </Route>
            <Route exact path="/showBuses">
                <ShowBuses/>
            </Route>
            </Switch>
        </Router>
         );
    }
}
 
export default HomeAdmin;