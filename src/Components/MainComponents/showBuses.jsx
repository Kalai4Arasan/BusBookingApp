import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import bus from '../../assets/images/bus.jpg';
import axios from 'axios';
class ShowBuses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            adminData:JSON.parse(sessionStorage.getItem('Admin')),
            busData:null,
            success:null,
         }
        // axios.get('http://localhost:4200/allBuses').then((res)=>{
        //     this.setState({busData:res.data})
        // })
    }
    printStar=(x)=>{
        let star=[]
        for(let i=0;i<x;i++){
            star.push(<i class="ui star icon gold" ></i>)
        }
        return star
    }
    componentDidMount(){
        axios.get('http://localhost:4200/allBuses').then((res)=>{
            this.setState({busData:res.data})
        })
    }

    render() { 
        console.log(this.state.busData)
        if(this.state.adminData==null || Object.keys(this.state.adminData).length==0){
            return <Redirect to="/loginAdmin"/>
        }
        return ( 
            <div class="ui grid container">
                <h3>All Registered Buses:<hr/></h3>
                <div class="row">
                    {this.state.busData!=null?this.state.busData.map((item)=>{
                        return (
                        <div class="four wide column" style={{marginTop:'2%'}}>
                            <div class="card" style={{boxShadow:'.1rem 0rem 1rem black',borderRadius:'1rem',width:'250px',height:'400px'}}>
                                <div class="image">
                                <img src={bus} alt={item.busname} style={{borderTopLeftRadius:'1rem',borderTopRightRadius:'1rem'}} height="200" width="250"/>
                                </div>
                                <div class="content" style={{margin:'3%'}}>
                                    <h3>{item.busname} </h3>
                                    <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{item.type}</h5>
                                    <table>
                                        <tr>
                                            <th><h3>From:</h3></th>
                                            <th><h3>To:</h3></th>
                                        </tr>
                                        <tr>
                                        <td>
                                        <h5 style={{color:'grey',display:'flex',marginTop:'-12px'}}>{item.from}</h5>
                                        </td>
                                        <td>
                                        <marquee style={{marginLeft:'45%'}} direction="up" scrollamount="2" height="50px" width="100px">
                                        {item.to.map(place=><p>{place[0]}</p>)}
                                        </marquee>
                                        </td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="extra" style={{marginBottom:'3%',marginLeft:'3%'}}>
                                Rating:  {this.printStar(item.rating)}
                                </div>
                            </div>
                            <div class="one wide column"></div>
                        </div>
                        );
                    }):''}
                </div>
            </div>
         );
    }
}
 
export default ShowBuses;