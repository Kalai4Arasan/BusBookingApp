import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBarComponent/NavBar';
import HomeAdmin from './Components/AdminComponents/HomeAdmin';
import Bookings from './Components/MainComponents/Bookings';
import BookedTickets from './Components/MainComponents/BookedTickets';
import CanceledTickets from './Components/MainComponents/CanceledTickets';
import OutDatedTickets from './Components/MainComponents/OutDatedTickets';

const Routes = () => (
    <Router>
        <Switch>
        <Route exact path="/">
          <NavBar/>
        </Route>
        <Route exact path="/admin">
          <HomeAdmin/>
        </Route>
        <Route exact path="/">
            <NavBar/>
        </Route>
        <Route exact path="/booktickets">
            <NavBar/>
        </Route>
        <Route exact path="/bookings">
            <NavBar/>
        </Route>
        <Route exact path="/login">
            <NavBar/>
        </Route>
        <Route exact path="/register">
            <NavBar/>
        </Route>
        <Route exact path="/account">
            <NavBar/>
        </Route>
        <Route exact path="/bookingseat">
            <NavBar/>
        </Route>
        <Route exact path="/success">
            <NavBar/>
        </Route>
        <Route exact path="/loginAdmin">
            <HomeAdmin/>
        </Route>
        <Route exact path="/addBus">
            <HomeAdmin/>
        </Route>
        <Route exact path="/accountAdmin">
            <HomeAdmin/>
        </Route>
        <Route exact path="/showBuses">
            <HomeAdmin/>
        </Route>
        <Route exact path="/bookings">
            <NavBar/>
        </Route>
        <Route exact path="/contactus">
            <NavBar/>
        </Route>
        <Route exact path="/canceledTickets">
            <NavBar/>
        </Route>
        <Route exact path="/outdatedTickets">
            <NavBar/>
        </Route>
        <Route exact path="/mail">
            <NavBar/>
        </Route>
        <Route exact path="/chat">
            <NavBar/>
        </Route>
        <Route exact path="/adminchat">
            <HomeAdmin/>
        </Route>
        <Route exact path="/privateChat">
            <HomeAdmin/>
        </Route>
        </Switch>
    </Router>
);

export default Routes;