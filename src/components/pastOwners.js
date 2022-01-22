import axios from 'axios';
import React, { Component } from 'react';
import './components.css';
import ShowLoader from './Loader';
class pastOwners extends Component {

    state={
        OwnerDetailsList:[],
        showloader:false,
        dataFound:false,
        message:"",
        tenantName:"",
        tenantPNumber:"",
        tenantRating:"",
            }
        
    getOwnerDetails=async()=>{
        var OwnerDetails=[];
        var tenantAdd= document.getElementById("tenantAdd").value.toString();
        await this.getTenantDetails(tenantAdd);
        this.setState({
            showloader:true
        })
        await axios.post('/api/SmartContracts/local-call',{
            "contractAddress": "PU8X3HSBKGZiv2tr8gfgx8NiuzGkEPnodM",
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
                if(apiAddress.length===0){
                    this.setState({
                        message:"There are No Owners Found For this Tenant."

                    })
                }
                
                apiAddress.forEach(async(item)=>{
                    await axios.post('/api/SmartContracts/local-call',{
                         "contractAddress": "PU8X3HSBKGZiv2tr8gfgx8NiuzGkEPnodM",
                         "methodName": "getSecureOwnerDetails",
                         "amount": "0",
                         "gasPrice": 100,
                         "gasLimit": 100000,
                         "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                         "parameters": [`9#${item}`]
                     }).then((res)=>{
                         console.log(res);
                         if(res.status===200){
                            OwnerDetails.push(res.data.return)
                             if(res.data.return.name!=null){
                                this.setState({
                                    OwnerDetailsList:OwnerDetails,
                                    dataFound:true
                                 })
                             }else{
                                this.setState({
                                    OwnerDetailsList:[],
                                    dataFound:false,
                                    message:"There are No Owners Found For this Tenant"
                                })
                             }
                            
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
      
            getTenantDetails=async(address)=>{
                await axios.post("/api/SmartContracts/local-call",{
                    "contractAddress": "PU8X3HSBKGZiv2tr8gfgx8NiuzGkEPnodM",
                    "methodName": "getSecureTenantDetails",
                    "amount": "0",
                    "gasPrice": 100,
                    "gasLimit": 100000,
                    "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                    "parameters": [`9#${address}`]
                }).then((response)=>{
                    console.log(response)
                    if(response.data.return.name!==null){
                        this.setState({
                            tenantName:response.data.return.name,
                            tenantPNumber:response.data.return.pnumber,
                            tenantRating:response.data.return.rating,
                        })
                    }else{
                        this.setState({
                            
                            tenantName:"",
                        })
                          
                    }
                    
                })

            }
    
    render() {
        console.log("datafound",this.state.dataFound)
        return (
            <div>
            <ShowLoader showLoader={this.state.showloader}></ShowLoader>
                <div className='glassEffect3' >

                <div className='title'>
                <h2>Tenant Record</h2>
                 </div>

                 <div className='ownerReg ownerReg2'>
                 <input type="text" id="tenantAdd" placeholder="Enter Tenants Wallet Address"></input><br></br>
                    <button className='giveHouseBtn btn-grad recordsbtn' onClick={this.getOwnerDetails}>Get Records</button>
               
                 </div>

                     </div>
                     {this.state.tenantName!==""?<div className='listglassEffect main'>
                                <div className='details'>
                                <p>Name: {this.state.tenantName}</p>
                                <p>Phone Number: {this.state.tenantPNumber}</p>
                                <p>Rating: {this.state.tenantRating} stars</p>
                                </div>
                                <div className='person'>
                                <div className="head">
                                </div>
                                
                                <div className="body">
                                </div>
                                
                                </div>
                            </div>:null}
                     
                     

                     
                     <div className='Message'>
                  {this.state.dataFound===true?<h2>Below Are List Of Owners Who Rented Their House To This Tenant:</h2>:<h2>{this.state.message}</h2>}<br></br>

                     </div>

                <div className='listArea'>

                    {
                        
                        this.state.OwnerDetailsList.map((list)=>{
                            
                            return(
                                
                            <div className='listglassEffect'>
                                <div className='details'>
                                <p>Name: {list.name}</p>
                                <p>Phone Number: {list.pnumber}</p>
                                <p>Rating: {list.rating} stars</p>
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