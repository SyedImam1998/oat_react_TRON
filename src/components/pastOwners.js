import axios from 'axios';
import React, { Component } from 'react';
import './components.css';
import ShowLoader from './Loader';
class pastOwners extends Component {

    state={
        OwnerDetailsList:[],
        showloader:false,
            }
    getOwnerDetails=()=>{
        var OwnerDetails=[];
        var tenantAdd= document.getElementById("tenantAdd").value.toString();
        this.setState({
            showloader:true
        })
        axios.post('/api/SmartContracts/local-call',{
            "contractAddress": "PQQvQVntNffwZep3fTuovPFiTVj24ey5wS",
            "methodName": "getOwnerDetails",
            "amount": "0",
            "gasPrice": 100,
            "gasLimit": 100000,
            "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
            "parameters": [`9#${tenantAdd}`]
        }).then((res)=>{
            console.log(res);
            if(res.status===200){
                var apiAddress=res.data.return;
                console.log(apiAddress);
                apiAddress.forEach(async(item)=>{
                    await axios.post('/api/SmartContracts/local-call',{
                         "contractAddress": "PQQvQVntNffwZep3fTuovPFiTVj24ey5wS",
                         "methodName": "getOwner",
                         "amount": "0",
                         "gasPrice": 100,
                         "gasLimit": 100000,
                         "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                         "parameters": [`9#${item}`]
                     }).then((res)=>{
                         
                         if(res.status===200){
                            OwnerDetails.push(res.data.return)
                             
                             this.setState({
                                OwnerDetailsList:OwnerDetails
                             })
                         }
                     })
                 })
                 
             }
         }).then((r)=>{
             console.log("setstate")
             this.setState({
                OwnerDetails:OwnerDetails,
             showloader:false

             })
            
         })

            }
      
    
    render() {
        return (
            <div>
            <ShowLoader showLoader={this.state.showloader}></ShowLoader>
                <div className='glassEffect3' >

                <div className='title'>
                <h2>Tenant Record</h2>
                 </div>

                 <div className='ownerReg ownerReg2'>
                 <input type="text" id="tenantAdd" defaultValue="PRp3q7X277wucCmvRdPv1oXnpC5JK4H5Eu" placeholder="Enter Tenants Wallet Address"></input><br></br>
                    <button className='giveHouseBtn btn-grad recordsbtn' onClick={this.getOwnerDetails}>Get Records</button>
               
                 </div>

                     </div>
                     
                     <br></br>
                     <br></br>
                     <div className='Message'>
                  {this.state.OwnerDetailsList.length>=1?<h2>Below Are List Of Owners Who Rented Their House To This Tenant:</h2>:null}<br></br>

                     </div>

                <div className='listArea'>

                    {
                        
                        this.state.OwnerDetailsList.map((list)=>{
                            
                            return(
                                
                            <div className='listglassEffect'>
                                <div className='details'>
                                <p>Name:{list.name}</p>
                                <p>Phone Number:{list.pnumber}</p>
                                <p>Rating:{list.rating} stars</p>
                                </div>
                                <div className='person'>
                                <div className="head">
                                </div>
                                
                                <div className="body">
                                </div>
                                
                                </div>
                            </div>)
                        })
                    }
                        
                     
                </div>
            </div>
        );
    }
}

export default pastOwners;