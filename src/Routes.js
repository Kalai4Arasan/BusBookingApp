import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './Components/NavBarComponent/NavBar';
import HomeAdmin from './Components/AdminComponents/HomeAdmin';
import NotFound from './Components/MainComponents/NotFound';
import Home from './Components/MainComponents/Home';
import BookTickets from './Components/MainComponents/BookTickets';
import Bookings from './Components/MainComponents/Bookings';
import HireBus from './Components/MainComponents/HireBus';
import Login from './Components/AuthComponents/Login';
import Register from './Components/AuthComponents/Register';
import Profile from './Components/MainComponents/Profile';
import BookingBus from './Components/TasksComponents/BookingBus';
import Success from './Components/TasksComponents/Success';
import LoginAdmin from './Components/AuthComponents/LoginAdmin';

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
        <Route exact path="/hirebus">
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
        </Switch>
    </Router>
);

export default Routes;