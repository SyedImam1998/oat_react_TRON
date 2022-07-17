import axios from 'axios';
import React, { Component } from 'react';
import './components.css';
import ShowLoader from './Loader';
import Web3 from 'web3';
import OatAbi from '../OAT.json';
import Confirmation  from './confirmation';
class giveHouse extends Component {

    state={
        txId:"",
        showloader:false,
        showConfirmation:false,
        msg:""
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
    giveHouse=async()=>{
        var ownerWalletAddress= document.getElementById("ownerAdd").value.toString();
        var ownerpwd= document.getElementById("ownerpwd").value.toString();
        var tenantWalletAddress= document.getElementById("tenantAdd").value.toString();

        if(ownerWalletAddress===""||ownerpwd===""||tenantWalletAddress===""){
            alert("All The Fields Needs To Be Filled !!!")
            return;
        }
        this.setState({
            showloader:true
        })

        await this.state.OatContract.methods.GiveHouse(ownerWalletAddress,tenantWalletAddress,ownerpwd).send({from:this.state.account}).then((result)=>{
            this.setState({
                showloader:false,
                showConfirmation:!this.state.showConfirmation,
                msg:""
            })
            document.getElementById("ownerAdd").value="";
            document.getElementById("ownerpwd").value="";
            document.getElementById("tenantAdd").value="";

        }).catch((e)=>{
            console.log(e)
            alert("Something went worng")
            this.setState({
                showloader:false,
               
             })
        })

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
            <div className='glassEffect2'>
            <div className='title'>
                <h2>Give House </h2>
            </div> 
                <div className='ownerReg ownerReg1'>
                <input type="text" id="ownerAdd" value={this.state.account} placeholder='Enter the Owner Wallet Address'></input><br></br>
                <input type="password" id="ownerpwd"  placeholder='Enter the Owner OAT Password'></input><br></br>
                <input type="text" id="tenantAdd" placeholder='Enter the Tenant Wallet Address'></input><br></br>
                <button className="giveHouseBtn btn-grad" onClick={this.giveHouse}>Give House</button><br></br>
                </div>
                
            </div>
            </div>

        );
    }
}

export default giveHouse;