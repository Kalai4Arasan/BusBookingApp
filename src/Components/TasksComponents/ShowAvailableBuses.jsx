import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route,useHistory,useLocation } from 'react-router-dom';
import bus from '../../assets/images/bus.jpg'
import BookingBus from './BookingBus';
import axios from 'axios';


class ShowAvailableBuses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            redirect:false,
            bookedSeats:null,
         }
    }
    componentDidMount(){

    }
    printStar=(x)=>{
        let star=[]
        for(let i=0;i<x;i++){
            star.push(<i class="ui star icon gold" ></i>)
        }
        return star
    }

    showRate(place){
        let ans=0
        this.props.content.to.forEach(item=>{
            if(item[0]===place){
                ans=item[1]
            }
        })
        return ans
    }
    bookseat=(busid,from,to,date)=>{
        //console.log(busid,from,to,date);
        let passData={
            'busid':busid,
            'from':from,
            'to':to,
            'date':date
        }
        axios.post('http://localhost:4200/getSeats',{passData}).then((res)=>{
            this.setState({bookedSeats:res.data})
            this.setState({redirect:true})
        })
    }


    render() { 
        if(this.state.redirect){
            if(sessionStorage.getItem('User')){
            return <Redirect to={{pathname:'/bookingseat',state:{data:this.props.content,toPlace:this.props.toPlace,toDate:this.props.toDate,bookedSeats:this.state.bookedSeats}}}/>
            }
            else{
                return <Redirect to="/login"/>
            }
        }
        return (
            <>
                <div class="card">
                    <div class="image">
                    <img src={bus} alt={this.props.content.busname}/>
                    </div>
                    <div class="content" style={{margin:'1%'}}>
                        <h3>{this.props.content.busname}<span style={{float:'right',color:'green'}}>&#8377;{this.showRate(this.props.toPlace)}</span> </h3>
                        <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{this.props.content.type}</h5>
                        <h3>From: <span style={{float:'right',marginRight:'20%'}}>To:</span></h3>
                        <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{this.props.content.from} <span style={{display:'flex',marginLeft:'8rem'}}>{this.props.toPlace}</span></h5>
                    </div>
                    <div class="extra" style={{marginBottom:'3%'}}>
                    Rating:  {this.printStar(this.props.content.rating)}
                    <button style={{float:'right'}} onClick={()=>this.bookseat(this.props.content._id,this.props.content.from,this.props.toPlace,this.props.toDate)}  class="ui button primary button">Book</button>
                    </div>
                </div>
            </>
            );
    }
}
 
export default ShowAvailableBuses;