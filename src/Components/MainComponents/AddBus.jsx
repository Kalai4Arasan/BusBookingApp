import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './MainComponents.css'
class AddBus extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            adminData:JSON.parse(sessionStorage.getItem('Admin')),
            success:null,
            redirect:false,
            districts:["Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kanchipuram","Kanyakumari","Karur","Krishnagiri","Kallakurichi","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Salem","Sivagangai","Thanjavur","Nilgiris","Theni","Thoothukudi","Tiruchirapalli","Tirunelveli","Tiruvallur","Tiruvannamalai","Tiruvarur","Vellore","Viluppuram","Virudhunagar","Ariyalur","Tirupur"],
            busname:null,
            from:null,
            to:null,
            type:null,
            rating:null,
            totalPlaces:[],
            ferror:null,
            errors:{
                busname:null,
                from:null,
                to:null,
                type:null,
                rating:null,
            }
        }
    }
    handleChange=(e)=>{
        e.preventDefault()
        let name=e.target.name
        let value=e.target.value
        switch(name){
            case 'busname':
                this.state.errors.busname=value!=null&&value.length>0?'':"Bus Name Must be required"
                break
            case 'from':
                this.state.errors.from=value!=null&&value.length>0?'':"From field Must be required"
                break
            case 'to':
                this.state.errors.to=value!=null&&value.length>0?'':"To field Must be required"
                break
            case 'rate':
                this.state.errors.rate=value!=null&&value.length>0?'':"To field Must be required"
                break
            case 'type':
                this.state.errors.type=value!=null&&value.length>0?'':"type Must be required"
                break
            case 'rating':
                this.state.errors.rating=value!=null&&value.length>0?'':"rating Must be required"
                break
        }
        this.setState({[name]:value})
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        let valid=true
        //console.log(this.state)
        for(let item of Object.values(this.state.errors)){
            if(item===null){
                valid=false
            }
        }
        if(this.state.totalPlaces.length===0){
            valid=false
        }
        if(valid===true){
            this.setState({ferror:null})
            let busData={
                'busname':this.state.busname,
                'from':this.state.from,
                'to':this.state.totalPlaces,
                'type':this.state.type,
                'rating':this.state.rating
            }
            axios.post('http://localhost:4200/registerBus',{busData}).then((res)=>{
                if(Object.keys(res.data).length>0){
                    this.setState({redirect:true})
                }   
            })
        }
        else{
            this.setState({ferror:'Invalid form please check your input values.'})
        }
    }

    handleToPlaces=(place,rate)=>{
        if(place!=null && rate!=undefined && this.state.totalPlaces.findIndex(x=>x[0]===place)==-1){
            this.state.totalPlaces.push([place,rate])  
            let list=this.state.totalPlaces
            this.setState({totalPlaces:list})
        }
        return 0;
    }

    deleteTag=(place,rate)=>{
        let index=this.state.totalPlaces.findIndex(x=>x[0]===place&&x[1]===rate)
        this.state.totalPlaces.splice(index,1)
        let list=this.state.totalPlaces
        this.setState({totalPlaces:list})
        this.setState({ferror:null})
        return 0;
    }
    
    componentDidMount(){
        
    }
    render() { 
        if(this.state.redirect===true){
            return <Redirect to="/showBuses"/>
        }
        if(this.state.adminData==null || Object.keys(this.state.adminData).length==0){
            return <Redirect to="/loginAdmin"/>
        }
        return ( 
            <div class="ui container" style={{marginTop:'2%'}}>
                <h3>Register A Bus:<hr/></h3>
                    <div class="ui form">
                        <div class="fields">
                            <div class="field">
                                <label>Bus name</label>
                                <input style={{border: this.state.errors.busname!=null && this.state.errors.busname.length>0 ? '1px solid red':''}} onChange={this.handleChange} name="busname" type="text" placeholder="Bus Name"/>
                            </div>
                            <div class="field scrollbar" style={{marginLeft:'13%'}} style={{marginLeft:'150px',width:'400px',height:'100px',overflowY:'scroll'}}>
                                {this.state.totalPlaces!=null?this.state.totalPlaces.map((item)=>{return <p style={{marginTop:'1%'}} class="ui teal tag label">{item[0]+" "+item[1]}<i class="delete icon" onClick={()=>this.deleteTag(item[0],item[1])}></i></p>}):''}
                            </div>
                        </div>
                        <div class="fields">
                            <div class="field">
                                <label>From Place:</label>
                                    <select style={{border: this.state.errors.from!=null && this.state.errors.from.length>0 ? '1px solid red':''}} onChange={this.handleChange} class="ui selection dropdown"  name="from" >
                                    <option value="">---</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                            </div>
                            <div class="field">

                            </div>
                            <div class="field" style={{marginLeft:'10%'}}>
                                <label>To Place:</label>
                                    <select style={{border: this.state.errors.to!=null && this.state.errors.to.length>0 ? '1px solid red':''}} onChange={this.handleChange}  class="ui selection dropdown"  name="to" >
                                    <option value="">---</option>
                                    {this.state.districts.map(item=> <option value={item}>{item}</option>)}
                                    </select>
                            </div>
                            <div class="field">
                                <input style={{border: this.state.errors.rate!=null && this.state.errors.rate.length>0 ? '1px solid red':''}} style={{border: this.state.errors.rate!=null && this.state.errors.rate.length>0 ? '1px solid red':''}} onChange={this.handleChange}  type="text" name="rate" style={{marginTop:'13%'}} placeholder="Travelling Rate"/>
                            </div>
                            <div class="field">
                                <button class="ui primary button"  onClick={this.handleToPlaces.bind(this,this.state.to,this.state.rate)} style={{marginTop:'35%'}}>Add</button>
                            </div>

                        </div>
                        <div class="fields">
                            <div class="field">
                                <label>Type:</label>
                                    <select style={{border: this.state.errors.type!=null && this.state.errors.type.length>0 ? '1px solid red':''}} onChange={this.handleChange} name="type"  class="ui selection dropdown"  name="type" >
                                    <option value="">---</option>
                                    <option value="AC">AC</option>
                                    <option value="NonAC">NonAC</option>
                                    <option value="AC/NonAC">AC/NonAC</option>
                                    </select>
                            </div>
                            <div class="field">

                            </div>
                            <div class="field" style={{marginLeft:'10%'}}>
                                <label>Rating:</label>
                                    <select style={{border: this.state.errors.rating!=null && this.state.errors.rating.length>0 ? '1px solid red':''}} onChange={this.handleChange}  class="ui selection dropdown"  name="rating" >
                                    <option value="">---</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                    {/* {this.state.ferror!=null && this.state.ferror.length>0 && this.state.ferror.length>0?<span class="alert-message2">{this.state.ferror}</span>:null} */}
                    <button class="ui positive button" onClick={this.handleSubmit.bind(this)} style={{marginTop:'3%',marginLeft:'20%'}}>Register</button>
            </div>
         );
    }
}
 
export default AddBus;