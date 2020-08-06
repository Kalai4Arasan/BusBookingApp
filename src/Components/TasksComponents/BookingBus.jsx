import React, { Component } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import bus from '../../assets/images/bus.jpg'
import './Task.css'
import { render } from '@testing-library/react';

var seats=[]
var Rate=0
var totalRate=0
var Data;
var finalData;
var history;

function printStar(x){
    let star=[]
    for(let i=0;i<x;i++){
        star.push(<i class="ui star icon gold" ></i>)
    }
    return star
}

function showRate(data,place){
    let ans=0
    data.to.forEach(item=>{
        if(item[0]===place){
            ans=item[1]
        }
    })
    Rate=ans
    return ans
}

function handleSeats(e){
    let value=e.target.value
    if(e.target.checked){
        seats.push(value)
    }
    else{
        var index = seats.indexOf(value);
        seats.splice(index, 1);
    }
    totalRate=seats.length*Rate
    document.getElementById('totrate').innerHTML="&#8377;"+seats.length*Rate
}

function printCheckBox(bookedSeats){
    let cb=[]
    for(let i=0;i<8;i++){
        for(let j=0;j<5;j++){
            if(j==0 || j==1){
                if(bookedSeats.includes(String.fromCharCode(i+65)+String(j+1))){
                    cb.push(<input type="checkbox" checked disabled onClick={handleSeats} name="seats[]" style={{margin:'2%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }
                else{
                cb.push(<input type="checkbox" onClick={handleSeats} name="seats[]" style={{margin:'2%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }
            }
            else if(j==3){
                if(bookedSeats.includes(String.fromCharCode(i+65)+String(j+1))){
                    cb.push(<input type="checkbox" checked disabled onClick={handleSeats} name="seats[]" style={{margin:'2%',marginLeft:'10%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }
                else{
                cb.push(<input type="checkbox" onClick={handleSeats} name="seats[]" style={{margin:'2%',marginLeft:'10%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }
            }
            else{
                if(bookedSeats.includes(String.fromCharCode(i+65)+String(j+1))){
                    cb.push(<input type="checkbox" checked disabled onClick={handleSeats} name="seats[]" style={{margin:'2%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }
                else{
                cb.push(<input type="checkbox" onClick={handleSeats} name="seats[]" style={{margin:'2%'}} value={String.fromCharCode(i+65)+String(j+1)}/>)
                }

            }
        }
        cb.push(<br/>)
    }
    return cb
}

function handleSubmit(e){
    e.preventDefault()
    if(totalRate==0 || seats.length==0){
        document.getElementById('error').innerHTML="Please select a valid seat";
    }
    else{
        document.getElementById('error').innerHTML="";
        let passData={
            'user':JSON.parse(sessionStorage.getItem('User')).name,
            'busid':Data.data._id,
            'busname':Data.data.busname,
            'from':Data.data.from,
            'to':Data.toPlace,
            'date':Data.toDate,
            'seats':seats,
            'totalrate':totalRate
        }
        console.log(passData)
        axios.post('http://localhost:4200/booktickets',{passData}).then((res)=>{
            if(Object.keys(res.data).length>0){
                console.log('success')
                finalData=res.data
                return history.push({
                    pathname:'/success',
                    state:{data:res.data}
                })
            }            
        })
    }
}

const BookingBus=function() {
    seats=[]
    history=useHistory()
    const p=useLocation()
    let data=p.state.data
    Data=p.state
    console.log(p.state.bookedSeats)
    if(!sessionStorage.getItem('User')){
        return <Redirect to="/login"/>
    }
    return (
        <div class="ui grid container">
            <div class="row">
            <div class="five wide column"></div>
                <div class="five wide column">
                    <div class="ui cards">
                    <div class="card">
                                <div class="image">
                                <img src={bus} alt={data.busname}/>
                                </div>
                                <div class="content" style={{margin:'1%'}}>
                                    <h3>{data.busname}<span style={{float:'right',color:'green'}}>&#8377;{showRate(data,p.state.toPlace)}</span> </h3>
                                    <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{data.type}</h5>
                                    <h3>From: <span style={{float:'right',marginRight:'20%'}}>To:</span></h3>
                                    <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{data.from} <span style={{display:'flex',marginLeft:'9rem'}}>{p.state.toPlace}</span></h5>
                                </div>
                                <div class="extra" style={{marginBottom:'3%'}}>
                                Rating:  {printStar(data.rating)}
                                </div>
                        </div>
                        </div>
                </div>
                <div class="five wide column"></div>

            </div>
            <form class="ui grid " style={{marginTop:'2%'}} onSubmit={handleSubmit}>
            <div class="row">
            <div class="six wide column"></div>
            <div class="five wide column">
            <h1 style={{marginLeft:'10%'}}>Seats Avaiable:</h1>
            </div>
            <div class="three wide column"></div>
            </div>
            <div class="row">
            <div class="eight wide column"></div>
                <div class="five wide column">
                    {printCheckBox(p.state.bookedSeats)}
                </div>
                <div class="three wide column"></div>

            </div>


            <div class="row">
            <div class="six wide column"></div>
            <div class="five wide column">
            <h1 style={{marginLeft:'10%'}}>Total Rate:</h1>
            </div>
            <div class="three wide column"></div>
            </div>
            <div class="row">
            <div class="seven wide column"></div>
                <div class="five wide column">
                    <h3 name="totrate" style={{textAlign:'center'}} id="totrate">&#8377; 0</h3>
                    <span id="error" class="alert-message"></span>
                    <input type="submit" class="ui button primary" style={{marginTop:'3%',display:'flex',marginLeft:'6rem'}} value="Book"/>
                </div>
                <div class="five wide column"></div>

            </div>
            </form>

        </div>
    )

}
 
export default BookingBus;