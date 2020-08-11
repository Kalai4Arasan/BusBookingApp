import React, { Component } from 'react';
import axios from 'axios';
class CanceledTickets extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            ticketData:null,
            success:null,
         }
    }
    componentDidMount(){
        if(sessionStorage.getItem('User')){
        axios.get('http://localhost:4200/canceledTickets',{
            params:{
                userid:this.state.userData._id,
            }
        }).then((res)=>{
            this.setState({ticketData:res.data})
        })
    }
    }
    render() { 
        return ( 
            <div>
                 <h3>Canceled Bookings:</h3>
                <hr/>
                {this.state.success!=null?<h3 style={{color:'white',fontWeight:'bolder',textAlign:'center',background:"#ff9669",padding:'1%',border:'1px solid #fc7f49 ',borderRadius:'1rem'}}>{this.state.success}</h3>:null}
                {this.state.ticketData!=null && this.state.ticketData.length>0 ?<table  class="ui celled table">
                    <thead>
                        <tr><th>User Name</th>
                        <th>Busname</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Date</th>
                        <th>Seats</th>
                        <th>Amount</th>
                    </tr></thead>
                    <tbody>
                        { this.state.ticketData.map((item)=>{
                            return (<tr>
                            <td>{item.user}</td>
                            <td>{item.busname}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{item.date.substr(0,10)}</td>
                            <td class="negative"><i class="icon checkmark"></i> {item.seats.join(",")}</td>
                            <td class="negative">&#8377;{item.totalrate}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>:<h3 >No Tickets had been canceled till now!!!</h3>} 
            </div>
         );
    }
}
 
export default CanceledTickets;