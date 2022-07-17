import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';
import Web3 from 'web3';
import OatAbi from '../OAT.json';


class pastTenants extends Component {
    state={
        tenantsDetailsList:[],
        showloader:false,
        dataFound:false,
        message:"",
        ownerName:"",
        ownerPNumber:"",
        ownerRating:"",
        // ownerRating:[1,2],
        
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
   
    getTenantDetails=async()=>{
        var ownerAdd= document.getElementById("ownerAdd").value.toString();
        // await this.getOwnerDetails(ownerAdd);
        
        this.setState({
            showloader:true
        })
       
        await this.state.OatContract.methods.getSecureOwnerDetails(ownerAdd).call().then(async(result)=>{
            console.log(result);
            if(result.name!==null){
                this.setState({
                    ownerName:result.name,
                    ownerPNumber:result.pnumber,
                    ownerRating:result.rating,
                })
                if(result.tenantAddresses.length===0){
                    this.setState({
                        message:"There are No Tenants Found For this Owner.",
                        dataFound:false,
                        tenantsDetailsList:[]


                    })
                }else{
                    result.tenantAddresses.map(async(item)=>{
                        this.getTenant(item)
                         
                    })
                }

            }else{
                this.setState({
                    
                    ownerName:"",
                })
                  
            }

        }).catch((error)=>{
            console.log(error);
        })
        this.setState({
            showloader:false
        })

       
    }

    getTenant=async(address)=>{
        var tenantsDetails=[];
        await this.state.OatContract.methods.getSecureTenantDetails(address).call().then((result)=>{
            tenantsDetails.push(result);
            this.setState({
                tenantsDetailsList:tenantsDetails,
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
        var tenantsDetailsList=this.state.tenantsDetailsList;
        console.log("render",tenantsDetailsList)
        var sum=this.state.ownerRating.reduce(this.myFuc);
        console.log(sum);
        console.log(this.state.ownerRating.length);
        
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
                               {this.state.ownerRating.length===0?<p>Rating: No One Rated</p>:<p>Rating: {(this.state.ownerRating.reduce(this.myFuc))/this.state.ownerRating.length} stars</p>} 

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
                        console.log(list.rating)
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

export default pastTenants;