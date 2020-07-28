import React, { Component } from 'react';
import axios from 'axios';
import bg from '../../assets/images/bookbg.jpg';
import noResult from '../../assets/images/noresult.jpg'
import "./Home.css";
import ShowAvailableBuses from '../TasksComponents/ShowAvailableBuses';
import { Link, Redirect, Switch, Route,BrowserRouter as Router } from 'react-router-dom';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            districts:["Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Kallakurichi","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivagangai","Thanjavur","Nilgiris","Theni","Thoothukudi","Tiruchirapalli","Tirunelveli","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar","Ariyalur","Tirupur"],
            same:null,
            checkDate:null,
            from:null,
            to:null,
            date:null,
            result:null || JSON.parse(localStorage.getItem("Result")),
            NoResult:false,

        }
    }
    handleForm=(e)=>{
        e.preventDefault()
        let name=e.target.name;
        let value=e.target.value;
        this.setState({[name]:value})
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.removeItem('Result');
        localStorage.removeItem('ToPlace');
        localStorage.removeItem('ToDate');
        if(this.state.from===this.state.to){
            this.setState({same:true})
        }
        else{
            this.setState({same:false})
        }
        if(new Date(this.state.date).getTime()<Date.now()){
            this.setState({checkDate:true})
        }
        else{
            this.setState({checkDate:false})
        }
        //console.log(this.state.checkDate,this.state.same)
        if(new Date(this.state.date).getTime()>Date.now() && this.state.from!=this.state.to){
            let Data={'from':this.state.from,'to':this.state.to,'date':this.state.date}
            axios.post('http://localhost:4200/available',{Data}).then((res)=>{
                if(res.data.length>0){
                this.setState({result:res.data});
                localStorage.setItem('Result',JSON.stringify(this.state.result));
                localStorage.setItem('ToPlace',this.state.to)
                localStorage.setItem('ToDate',this.state.date)
                this.setState({NoResult:false})
                }
                else{
                    localStorage.removeItem('Result');
                    localStorage.removeItem('ToPlace');
                    localStorage.removeItem('ToDate');
                    this.setState({result:null})
                    this.setState({NoResult:true})
                }
            })
            this.setState({same:false})
            this.setState({checkDate:false})
        }
    }
    render() { 
        if(this.state.NoResult===false && this.state.result!=null && Object.keys(this.state.result).length>0){
            return (
                <div class="ui container" style={{marginTop:'4%'}}>
                    <form class="ui form searchForm" onSubmit={this.handleSubmit}>
                            <div class="fields">
                                <div class="field">
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="from" required>
                                    <option value={this.state.result[0].from?this.state.result[0].from:this.state.from } selected >{this.state.result[0].from?this.state.result[0].from:this.state.from}</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field">
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="to" required>
                                    <option value={localStorage.getItem('ToPlace')?localStorage.getItem('ToPlace'):this.state.to} selected>{localStorage.getItem('ToPlace')?localStorage.getItem('ToPlace'):this.state.to}</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field">
                                    <input onChange={this.handleForm} placeholder="Date" name="date" value={this.state.date?this.state.date:localStorage.getItem('ToDate')} style={{height:'40px',fontWeight:'700',border:this.state.checkDate===true? '1px solid red':''}} type="date" required/>                             
                                </div>
                                <div class="field">
                                    <input class="ui positive button" style={{height:'40px',marginBottom:'4%'}} type="submit" value="Search"/>                               
                                </div>
                            </div>
                            </form>
                    <div class="ui four cards">
                    {this.state.result.map(item=><ShowAvailableBuses content={item} toPlace={localStorage.getItem('ToPlace')?localStorage.getItem('ToPlace'):this.state.to}/>)}
                    </div>
                </div>
            )
        }
        else if(this.state.NoResult===false && this.state.result==null){
            localStorage.removeItem('Result');
            localStorage.removeItem('ToPlace');
            localStorage.removeItem('ToDate');
        return ( 
            <>
            <img src={bg} style={{display:'flex',marginTop:'-14px',opacity:'.7',height:'550px',width:'100%'}}/>
            <div class="ui grid container" style={{display:'flex',marginTop:'-480px'}}>
                <div class="row">
                    <div class="two wide column"></div>
                    <div class="ten wide column">
                        <div class="inputSearchBar">
                        <form class="ui form searchForm" onSubmit={this.handleSubmit}>
                            <h2 style={{textAlign:'center',fontSize:'30px',marginLeft:'20%',marginBottom:'18%'}}>Welcome To BookMyTrip</h2>
                            <h5 style={{fontWeight:'bolder'}}>Search Available Buses:</h5>
                            <div class="fields">
                                <div class="field" style={{display:'flex',marginLeft:'-10px',marginBottom:'4%'}}>
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="from" required>
                                    <option value="" disabled selected >From</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field" style={{display:'flex',marginLeft:'-10px',marginBottom:'4%'}}>
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="to" required>
                                    <option value="" disabled selected>To</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field" style={{display:'flex',marginLeft:'-10px',marginBottom:'4%'}}>
                                    <input onChange={this.handleForm} placeholder="Date" name="date" style={{height:'40px',fontWeight:'700',border:this.state.checkDate===true? '1px solid red':''}} type="date" required/>                             
                                </div>
                                <div class="field">
                                    <input class="ui positive button" style={{height:'40px',marginBottom:'4%'}} type="submit" value="Search"/>                               
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="two wide column"></div>
                </div>
            </div>
            </>
         );
        }
        else{
            localStorage.removeItem('Result');
            localStorage.removeItem('ToPlace');
            localStorage.removeItem('ToDate');
            return (
                <div class="ui container" style={{marginTop:'4%'}}>
                    <form class="ui form searchForm" onSubmit={this.handleSubmit}>
                            <div class="fields">
                                <div class="field">
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="from" required>
                                    <option value={this.state.from } selected >{this.state.from}</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field">
                                    <select onChange={this.handleForm} class="ui selection dropdown" style={{height:'40px',fontWeight:'700',border:this.state.same===true? '1px solid red':''}} name="to" required>
                                    <option value={this.state.to} selected>{this.state.to}</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                <div class="field">
                                    <input onChange={this.handleForm} placeholder="Date" name="date" value={this.state.date} style={{height:'40px',fontWeight:'700',border:this.state.checkDate===true? '1px solid red':''}} type="date" required/>                             
                                </div>
                                <div class="field">
                                    <input class="ui positive button" style={{height:'40px',marginBottom:'4%'}} type="submit" value="Search"/>                               
                                </div>
                            </div>
                            </form>
                    <div class="ui four cards">
                    <img style={{display:'block',marginLeft:'auto',marginRight:'auto'}} src={noResult}/>
                    </div>
                </div>
            )

        }
    }
}
 
export default Home;