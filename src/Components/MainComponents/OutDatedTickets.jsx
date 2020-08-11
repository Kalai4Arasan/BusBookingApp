import React, { Component } from 'react';
import axios from 'axios';
class OutDatedTickets extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            userData:JSON.parse(sessionStorage.getItem('User')),
            ticketData:null,
            success:null,
            rating:5,
         }
    }
    handleRating=(tid,busid,rating)=>{
        axios.get('http://localhost:4200/rateBus',{
            params:{
                tid:tid,
                busid:busid,
                rating:rating,
            }
        }).then((res)=>{
            console.log(res.data)
            if(Object.keys(res.data).length>0){
                axios.get('http://localhost:4200/outDatedTickets',{
                        params:{
                            userid:this.state.userData._id,
                        }
                    }).then((res)=>{
                        console.log(res.data)
                        this.setState({ticketData:res.data})
                    })
                }
            })
    }
    handleRateInput=(id,e)=>{
        console.log(id)
        this.setState({[id]:e.target.value})
    }
    componentDidMount(){
        if(sessionStorage.getItem('User')){
        axios.get('http://localhost:4200/outDatedTickets',{
            params:{
                userid:this.state.userData._id,
            }
        }).then((res)=>{
            console.log(res.data)
            this.setState({ticketData:res.data})
        })
    }
    }
    printStar=(x)=>{
        let star=[]
        for(let i=0;i<x;i++){
            star.push(<i class="ui star icon gold" ></i>)
        }
        return star
    }
    render() { 
        return ( 
            <div>
                 <h3>Completed Bookings:</h3>
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
                            <td>{item.rated===0?<div><input style={{outline:'none'}} onChange={this.handleRateInput.bind(this,item._id)} type="range" min="1" max="5"/><span style={{display:'flex'}}>{this.printStar(this.state[item._id])}</span><a onClick={()=>this.handleRating(item._id,item.busid,this.state[item._id])} style={{marginLeft:'4%',marginTop:'4%'}}  class="ui positive button">Rate us</a></div>:<h5>Already Rated</h5>}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>:<h3 >Sorry No completed bookings available till now !!!</h3>} 
            </div>
         );
    }
}
 
export default OutDatedTickets;