import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';


class pastTenants extends Component {
    state={
        tenantsDetailsList:[],
        showloader:false
        
    }
    getTenantDetails=async()=>{
        var ownerAdd= document.getElementById("ownerAdd").value.toString();
        var tenantsDetails=[];
        this.setState({
            showloader:true
        })
       
       await axios.post('/api/SmartContracts/local-call',
       {
            "contractAddress": "PQQvQVntNffwZep3fTuovPFiTVj24ey5wS",
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



                // for(var i=0;i<apiAddress.length;i++){
                
                   

                // }
                apiAddress.forEach(async(item)=>{
                   await axios.post('/api/SmartContracts/local-call',{
                        "contractAddress": "PQQvQVntNffwZep3fTuovPFiTVj24ey5wS",
                        "methodName": "getTenants",
                        "amount": "0",
                        "gasPrice": 100,
                        "gasLimit": 100000,
                        "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                        "parameters": [`9#${item}`]
                    }).then((res)=>{
                        
                        if(res.status===200){
                            tenantsDetails.push(res.data.return)
                            
                            this.setState({
                                tenantsDetailsList:tenantsDetails
                            })
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
                    <input type="text" defaultValue="PRp3q7X277wucCmvRdPv1oXnpC5JK4H5Eu" id="ownerAdd" placeholder="Enter Owner Wallet Address"></input><br></br>
                    <button className='giveHouseBtn btn-grad recordsbtn' onClick={this.getTenantDetails}>Get Records</button>
                </div>

                </div>
                <br></br>
                     <br></br>
                     <br></br>
                    <div className='Message'>
                        {this.state.tenantsDetailsList.length>=1?<h2>These Are The List Of Tenants Who Rented This Owner House: </h2>:null}
                    </div>
                     <div className='listArea'>
                  
                  {
                      this.state.tenantsDetailsList.map((list)=>{
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

export default pastTenants;