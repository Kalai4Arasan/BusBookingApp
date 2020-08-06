import React, { Component } from 'react';
import wallpaper from '../../assets/images/wallpaper.png'
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
            <img src={wallpaper} style={{display:'flex',marginTop:'-13px',backgroundSize:'cover',backgroundRepeat:'none',height:'700px',width:'100%'}}/>
            <div class="ui grid container">
                <div class="row">
                <h1 style={{textAlign:'center',display:'flex',marginTop:'-670px',marginLeft:'560px',textTransform:'uppercase'}}><span style={{color:'blue'}}>Welcome To &nbsp;</span> <span style={{color:'white'}}> Admin Panel...</span></h1>
                </div>
            </div>
            </>
         );
    }
}
 
export default Welcome;