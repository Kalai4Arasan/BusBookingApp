import React, { Component } from 'react';
import { json } from 'body-parser';
import { Redirect } from 'react-router-dom';
import profileLogo from '../../assets/images/profile.png';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:JSON.parse(sessionStorage.getItem('User')),
         }
    }
    render() { 
        if(sessionStorage.getItem('User')){
            return ( 
                <>
                <div class="ui card" style={{display:'flex',marginLeft:'40%',marginRight:'40%',marginBottom:'4%',marginTop:'4%'}}>
                    <a class="image" href="#">
                        <img src={profileLogo} alt="userImage"/>
                    </a>
                    <div class="content">
                        <a class="header" href="#">{this.state.data.name}</a>
                        <div class="meta">
                        <a>Type:User</a>
                        </div>
                    </div>
                    </div>
                    <div class="ui grid container">
                    <div class="row">
                        <div class="three wide column">

                        </div>
                        <div class="ten wide column">
                            <table class="ui single line table">
                                <thead>
                                    <tr>
                                    <th></th>
                                    <th></th>
                                    <th><strong style={{display:'flex',marginLeft:'30%'}}>Details</strong></th>
                                    </tr>
                                </thead>
                                <tbody style={{textAlign:'center',fontWeight:'500'}}>
                                    <tr>
                                    <td>Email</td>
                                    <td>:</td>
                                    <td>{this.state.data.email}</td>
                                    </tr>
                                    <tr>
                                    <td>Address</td>
                                    <td>:</td>
                                    <td>{this.state.data.address}</td>
                                    </tr>
                                    <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{this.state.data.phone}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="three wide column"></div>
                    </div>
                    </div>
                </>
            );
        }
        else{
            return <Redirect to="/login"/>
        }
    }
}
 
export default Profile;