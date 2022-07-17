import React, { Component } from 'react';
// import axios from 'axios';
import './components.css';
import OatAbi from '../OAT.json';

import ShowLoader from './Loader';
import Confirmation  from './confirmation';
import Web3 from 'web3';

class ownerRegister extends Component {
    state={
        txId:"",
        showloader:false,
        showConfirmation:false,
        msg:"",
        account:"",
        OatContract:""
    }

    componentDidMount(){
    this.commonfunction();
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
  
    submitDataToContract=async()=>{
        console.log(this.state.OatContract);
        var name=document.getElementById("name").value.toString();
        var hAdd= document.getElementById("hAdd").value.toString();
       
        var phone= document.getElementById("phone").value.toString();
        var walletAdd= document.getElementById("walletAdd").value.toString();
        var ownerpwd= document.getElementById("walletPassword").value.toString();

        if(name===""|| hAdd===""||phone===""||walletAdd===""||ownerpwd===""){
            alert("All The Fields Needs To Be Filled !!!")
            return
        }

        this.setState({
            showloader:true
        })

        await this.state.OatContract.methods.setOwner(name,ownerpwd,hAdd,phone,walletAdd).send({from:this.state.account}).then((result)=>{
            // alert("Data Saved Successfully!!!")
            document.getElementById("hAdd").value="";
             document.getElementById("name").value="";
                document.getElementById("phone").value="";
                document.getElementById("walletAdd").value="";
                document.getElementById("walletPassword").value=""; 
            this.setState({
                showloader:false,
                msg:"",
                showConfirmation:!this.state.showConfirmation,
                 
               
             })
          }).catch((error)=>{
            // alert("Something went wrong!!!");
            this.setState({
                showloader:false,
                msg:"Something went wrong!!!",
               showConfirmation:!this.state.showConfirmation,
               
             })

          });
       
       

    }
    
    close=()=>{
        this.setState({
            showConfirmation:!this.state.showConfirmation,

        })
    }

    render() {
        return (
            <div>
                <Confirmation msg={this.state.msg} showConfirmation={this.state.showConfirmation}  close={this.close}></Confirmation>
            <ShowLoader showLoader={this.state.showloader}></ShowLoader>

            <div className='glassEffect1'>
            <div className='title'>
                <h2>Owner Registration </h2>
            </div>
                <div className='ownerReg'>
                    <input type="text"  id="name" placeholder='Enter Your Name'></input><br></br>
                    <input type="text" id="hAdd" placeholder='Enter Your House Address'></input><br></br>
                    <input type="number"  id="phone" placeholder='Enter Mobile Number'></input><br></br>
                    <input type="text" id="walletAdd" value={this.state.account} placeholder='Enter the Your Wallet Address'></input><br></br>
                    <input type="password" id="walletPassword" placeholder='Enter New OAT Passoword'></input><br></br>
                    <button className='giveHouseBtn btn-grad' onClick={this.submitDataToContract}>Register</button><br></br>
                    {/* Click here to verify status:<button className='verifyDataBtn' onClick={this.verifyData}>Verify</button> */}
                </div>
            </div>
            </div>
        );
    }
}

export default ownerRegister;