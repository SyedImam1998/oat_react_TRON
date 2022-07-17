import axios from 'axios';
import React, { Component } from 'react';
import './components.css';
import ShowLoader from './Loader';
import Web3 from 'web3';
import OatAbi from '../OAT.json';

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
        
            componentDidMount(){
                this.commonfunction()
            }
            
            commonfunction=async()=>{
                if(typeof window.ethereum!=='undefined'){
                    const web3= new Web3(window.ethereum);
                    window.ethereum.enable().catch(error => {
                      // User denied account access
                     console.log(error)
                     alert("Please Login with Metamask.")
                      })
                   
                      try{
                       
                        // const netId= await web3.eth.net.getId();
                        const accounts= await web3.eth.getAccounts();
                        this.setState({
                          account:accounts[0],
                        })
                        console.log(accounts[0]);
                        // const accountBalance= await web3.eth.getBalance(accounts[0]);
                        // const etherAmount= web3.utils.fromWei(accountBalance,'ether');
                         
              
                        const Oat= new web3.eth.Contract(OatAbi.abi,"0xb23cD6903E1aBC8bcc8d9D1C44b9E6b3de8b4799")
                        console.log(Oat);
                        this.setState({
                          OatContract:Oat
                        })
              
                       
                       
                      
                        
                      }catch(e){
                        window.alert("Contracts went wrong",e);
                        console.log(e)
              
                      }
              
                  }
              
              
            }
            
            
    getOwnerDetails=async()=>{
        // var OwnerDetails=[];
        var tenantAdd= document.getElementById("tenantAdd").value.toString();
        // await this.getTenantDetails(tenantAdd);
        this.setState({
            showloader:true
        })


        await this.state.OatContract.methods.getSecureTenantDetails(tenantAdd).call().then((result)=>{
            console.log(result)

            if(result.name!==null){
                this.setState({
                    tenantName:result.name,
                    tenantPNumber:result.pnumber,
                    tenantRating:result.rating,
                   
                })
                if(result.OwnerAddresses.length===0){
                    this.setState({
                        message:"There are No Owners Found For this Tenant.",
                        dataFound:false,
                        OwnerDetailsList:[]


                    })
                }else{
                    result.OwnerAddresses.map(async(item)=>{
                        this.getOwner(item)
                         
                    })
                }

            }else{
                this.setState({
                    
                    ownerName:"",
                })
                  
            }
            this.setState({
                showloader:false
            })
        }).catch((er)=>{
            console.log(er)
            this.setState({
                showloader:false
            })
        })
        // await axios.post('/api/SmartContracts/local-call',{
        //     "contractAddress": "PVSatfPKpTMbZurA2kswFt6KApNBvQqHkT",
        //     "methodName": "getOwnerDetails",
        //     "amount": "0",
        //     "gasPrice": 100,
        //     "gasLimit": 100000,
        //     "sender": "PC4EdHV7R5Fsf5g5iCzCa2AyzN5VHXj3TB",
        //     "parameters": [`9#${tenantAdd}`]
        // }).then((res)=>{
        //     console.log(res);
        //     if(res.status===200){
        //         var apiAddress=res.data.return;
        //         console.log(apiAddress);
        //         if(apiAddress.length===0){
        //             this.setState({
        //                 message:"There are No Owners Found For this Tenant."

        //             })
        //         }
                
        //         apiAddress.forEach(async(item)=>{
        //             await axios.post('/api/SmartContracts/local-call',{
        //                  "contractAddress": "PVSatfPKpTMbZurA2kswFt6KApNBvQqHkT",
        //                  "methodName": "getSecureOwnerDetails",
        //                  "amount": "0",
        //                  "gasPrice": 100,
        //                  "gasLimit": 100000,
        //                  "sender": "PC4EdHV7R5Fsf5g5iCzCa2AyzN5VHXj3TB",
        //                  "parameters": [`9#${item}`]
        //              }).then((res)=>{
        //                  console.log(res);
        //                  if(res.status===200){
        //                     OwnerDetails.push(res.data.return)
        //                      if(res.data.return.name!=null){
        //                         this.setState({
        //                             OwnerDetailsList:OwnerDetails,
        //                             dataFound:true
        //                          })
        //                      }else{
        //                         this.setState({
        //                             OwnerDetailsList:[],
        //                             dataFound:false,
        //                             message:"There are No Owners Found For this Tenant"
        //                         })
        //                      }
                            
        //                  }
        //              })
        //          })
                 
        //      }
        //  }).then((r)=>{
        //      console.log("setstate")
        //      this.setState({
        //         OwnerDetails:OwnerDetails,
        //      showloader:false

        //      })
            
        //  })

            }
      
            // getTenantDetails=async(address)=>{
            //     await axios.post("/api/SmartContracts/local-call",{
            //         "contractAddress": "PVSatfPKpTMbZurA2kswFt6KApNBvQqHkT",
            //         "methodName": "getSecureTenantDetails",
            //         "amount": "0",
            //         "gasPrice": 100,
            //         "gasLimit": 100000,
            //         "sender": "PC4EdHV7R5Fsf5g5iCzCa2AyzN5VHXj3TB",
            //         "parameters": [`9#${address}`]
            //     }).then((response)=>{
            //         console.log(response)
            //         if(response.data.return.name!==null){
            //             this.setState({
            //                 tenantName:response.data.return.name,
            //                 tenantPNumber:response.data.return.pnumber,
            //                 tenantRating:response.data.return.rating,
            //             })
            //         }else{
            //             this.setState({
                            
            //                 tenantName:"",
            //             })
                          
            //         }
                    
            //     })

            // }

    getOwner=async(address)=>{
                var OwnerDetails=[];
                await this.state.OatContract.methods.getSecureOwnerDetails(address).call().then((result)=>{
                    console.log(result)
                    OwnerDetails.push(result);
                    this.setState({
                        OwnerDetailsList:OwnerDetails,
                        dataFound:true
                    })
                   
                }).catch((e)=>{
                    console.log(e);
                })
        
        
            }

            myFuc=(total,n)=>{
                return parseInt(total)+parseInt(n);

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
                               {this.state.tenantRating.length===0?<p>Rating:No One Rated</p>:<p>Rating: {(this.state.tenantRating.reduce(this.myFuc))/this.state.tenantRating.length} stars</p>} 
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
                              {list.rating.length===0 ? <p>Rating: No one Rated</p>:<p>Rating: {list.rating.reduce(this.myFuc)} stars</p>}

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