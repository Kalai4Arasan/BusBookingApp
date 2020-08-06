import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
class Bookings extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            ticketData:null,
            success:null,
         }
         if(sessionStorage.getItem('User')){
            axios.get('http://localhost:4200/bookedTickets',{
                params:{
                    name:this.state.userData.name,
                }
            }).then((res)=>{
                console.log(res.data)
                this.setState({ticketData:res.data})
            })
        }
    }
    handleCancel=(id)=>{
        if(window.confirm("Are you sure?")){
            axios.get('http://localhost:4200/cancelTicket',{
                params:{
                    id:id,
                }
            }).then((res)=>{
                if(Object.keys(res.data).length>0){
                    axios.get('http://localhost:4200/bookedTickets',{
                        params:{
                            name:this.state.userData.name,
                        }
                    }).then((res)=>{
                        console.log(res.data)
                        this.setState({ticketData:res.data})
                    })
                    this.setState({success:"You ticket is canceled on "+new Date()})
                }
                else{
                    this.setState({success:null})
                }
            })
        }
    }
    componentDidMount(){
        if(sessionStorage.getItem('User')){
        axios.get('http://localhost:4200/bookedTickets',{
            params:{
                name:this.state.userData.name,
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({ticketData:res.data})
        })
    }
    }
    render() { 
        if(this.state.userData==null || Object.keys(this.state.userData).length==0){
            return <Redirect to="/login"/>
        }
        return ( 
            <div class="ui container" style={{marginTop:'2%'}}>
                <h3>Your Bookings:</h3>
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
                        <th>Task</th>
                    </tr></thead>
                    <tbody>
                        { this.state.ticketData.map((item)=>{
                            return (<tr>
                            <td>{item.user}</td>
                            <td>{item.busname}</td>
                            <td>{item.from}</td>
                            <td>{item.to}</td>
                            <td>{item.date.substr(0,10)}</td>
                            <td class="positive"><i class="icon checkmark"></i> {item.seats.join(",")}</td>
                            <td class="positive">&#8377;{item.totalrate}</td>
                            <td><a onClick={()=>this.handleCancel(item._id)}  class="ui negative button">Cancel</a></td>
                            </tr>)
                        })}
                    </tbody>
                </table>:<h3 >Sorry No booking available till now ...Go and book your tickets makkale!!!</h3>}
            </div>
         );
    }
}
 
export default Bookings;