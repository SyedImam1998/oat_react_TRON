import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';


class pastTenants extends Component {
    state={
        tenantsDetailsList:[],
        showloader:false,
        dataFound:false,
        message:"",
        ownerName:"",
        ownerPNumber:"",
        ownerRating:"",
        
    }
    getTenantDetails=async()=>{
        var ownerAdd= document.getElementById("ownerAdd").value.toString();
        await this.getOwnerDetails(ownerAdd);
        var tenantsDetails=[];
        this.setState({
            showloader:true
        })
       
       await axios.post('/api/SmartContracts/local-call',
       {
            "contractAddress": "PGHQj1bRntTmg3atP2923Ruu1n3i9WiYmc",
            "methodName": "getTenantsDetails",
            "amount": "0",
            "gasPrice": 100,
            "gasLimit": 100000,
            "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
            "parameters": [`9#${ownerAdd}`]
        }

        ).then((res)=>{
            
            if(res.status===200){
               
                var apiAddress=res.data.return;
                if(apiAddress.length===0){
                    this.setState({
                        message:"There are No Tenants Found For this Owner."

                    })
                }



                // for(var i=0;i<apiAddress.length;i++){
                
                   

                // }
                apiAddress.forEach(async(item)=>{
                   await axios.post('/api/SmartContracts/local-call',{
                        "contractAddress": "PGHQj1bRntTmg3atP2923Ruu1n3i9WiYmc",
                        "methodName": "getSecureTenantDetails",
                        "amount": "0",
                        "gasPrice": 100,
                        "gasLimit": 100000,
                        "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                        "parameters": [`9#${item}`]
                    }).then((res)=>{
                        
                        if(res.status===200){
                            tenantsDetails.push(res.data.return)
                            if(res.data.return.name!=null){

                                this.setState({
                                    tenantsDetailsList:tenantsDetails,
                                    dataFound:true
                                })
                            }else{
                                this.setState({
                                    tenantsDetailsList:[],
                                    dataFound:false,
                                    message:"There are No Tenants Found For this Owner"

                                })

                            }
                           
                        }
                    })
                })

            }
        }).then((r)=>{
            console.log("setstate")
            this.setState({
                tenantsDetailsList:tenantsDetails,
            showloader:false

            })
           
        })
       
    }
    getOwnerDetails=async(address)=>{
        await axios.post("/api/SmartContracts/local-call",{
            "contractAddress": "PGHQj1bRntTmg3atP2923Ruu1n3i9WiYmc",
            "methodName": "getSecureOwnerDetails",
            "amount": "0",
            "gasPrice": 100,
            "gasLimit": 100000,
            "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
            "parameters": [`9#${address}`]
        }).then((response)=>{
            console.log(response)
            if(response.data.return.name!==null){
                this.setState({
                    ownerName:response.data.return.name,
                    ownerPNumber:response.data.return.pnumber,
                    ownerRating:response.data.return.rating,
                })
            }else{
                this.setState({
                    
                    ownerName:"",
                })
                  
            }
            
        })

    }
    
    render() {
        var tenantsDetailsList=this.state.tenantsDetailsList;
        console.log("render",tenantsDetailsList)
        return (
            <div>
            <ShowLoader showLoader={this.state.showloader}></ShowLoader>

                <div className='glassEffect3' >
                <div className='title'>
                    <h2>Owner Record</h2>
                    </div>
                <div className='ownerReg ownerReg2'>
                    <input type="text" id="ownerAdd" placeholder="Enter Owner Wallet Address"></input><br></br>
                    <button className='giveHouseBtn btn-grad recordsbtn' onClick={this.getTenantDetails}>Get Records</button>
                </div>

                </div>
                {this.state.ownerName!==""?<div className='listglassEffect main'>
                                <div className='details'>
                                <p>Name: {this.state.ownerName}</p>
                                <p>Phone Number: {this.state.ownerPNumber}</p>
                                <p>Rating: {this.state.ownerRating} stars</p>
                                </div>
                                <div className='person'>
                                <div className="head">
                                </div>
                                
                                <div className="body">
                                </div>
                                
                                </div>
                            </div>:null}






                     <div className='Message'>
                  {this.state.dataFound===true?<h2>Below Are List Of Tenants Who Rented This Owner House:</h2>:<h2>{this.state.message}</h2>}<br></br>

                     </div>
                     <div className='listArea'>
                  
                  {
                      this.state.tenantsDetailsList.map((list)=>{
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

export default pastTenants;