import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import success from '../../assets/images/success.jpg'

const Success=function(){
    const history=useHistory()
    const Data=useLocation()
    let data=Data.state.data
    return (
        <div class="ui grid">
            <img src={success} height="300px" style={{marginLeft:'auto',marginRight:'auto',width:'30%'}}/>
            <div class="row">
                    <div class="four wide column"></div>
                    <div class="eight wide column">
                    <   table class="ui green table">
                        <thead>
                            <tr><th></th>
                            <th style={{textTransform:'uppercase'}}>Ticket Details</th>
                        </tr></thead><tbody>
                            <tr>
                            <td>Username</td>
                            <td style={{fontWeight:'700'}}>{data.user}</td>
                            </tr>
                            <tr>
                            <td>From</td>
                            <td style={{fontWeight:'700'}}>{data.from}</td>
                            </tr>
                            <tr>
                            <td>To</td>
                            <td style={{fontWeight:'700'}}>{data.to}</td>
                            </tr>
                            <tr>
                            <td>Seats</td>
                            <td style={{fontWeight:'700'}}><tr>{data.seats.map(item=><td>{item}</td>)}</tr></td>
                            </tr>
                            <tr>
                            <td>Travelling Date</td>
                            <td style={{fontWeight:'700'}}>{data.date.substr(0,10)}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    <div class="four wide column"></div>
            </div>
        <button style={{cursor:'pointer',margin:'2%',textAlign:'center'}} class="ui button inverted primary" onClick={()=>history.push('/')}>Go Home</button>
        </div>
    );
}
export default Success