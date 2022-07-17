import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';
import Web3 from 'web3';
import OatAbi from '../OAT.json';
import Confirmation  from './confirmation';
class tenantRegister extends Component {

state={
    txId:"",
    showloader:false,
    showConfirmation:false,
    msg:"",
    account:"",
    OatContract:""
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
    
        submitDataToContract=async()=>{
            var name=document.getElementById("name").value.toString();
           
            var phone= document.getElementById("phone").value.toString();
            var walletAdd= document.getElementById("walletAdd").value.toString();
            var pwd=document.getElementById("password").value.toString();
            if(name===""|| phone===""||walletAdd===""||pwd===""){
                alert("All The Fields Needs To Be Filled !!!")
                return;
            }
            this.setState({
                showloader:true
            })
            await this.state.OatContract.methods.setTenant(name,phone,walletAdd,pwd).send({from:this.state.account}).then((result)=>{
                document.getElementById("name").value="";
                document.getElementById("phone").value="";
                document.getElementById("walletAdd").value="";
                document.getElementById("password").value=""; 
                this.setState({
                    showloader:false,
                    showConfirmation:!this.state.showConfirmation,
                    msg:""
                })
               

            }).catch((e)=>{
                alert("Something went wrong!!!");
                this.setState({
                    showloader:false,
                   
                 })
            })
            
    }
    verifyData=async()=>{
        this.setState({
            showloader:true
        })
        await axios.get(`/api/SmartContracts/receipt?txHash=${this.state.txId}`).then((response)=>{
            console.log("response for TXID",response)
            if(response.status===200){
                console.log("Tx has been passed");
                if(response.data.error===null){
                    if(response.data.returnValue==="okay"){
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:""
                        })
                       
    
                       }else{
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:"Tenant Already Exists!!!"
                        })
    
                       }
                       
                }
            }
        }).catch((e)=>{
            console.log("error for TXID", e);
            this.verifyData();
        })

    }
    close=()=>{
        this.setState({
            showConfirmation:!this.state.showConfirmation,

        })
    }
    render() {
        console.log(this.state.account)
        return (
            <div>
            <Confirmation msg={this.state.msg} showConfirmation={this.state.showConfirmation}  close={this.close}></Confirmation>
            <ShowLoader showLoader={this.state.showloader}></ShowLoader>

           
            <div className='glassEffect2'>
              <div className='title'>
                <h2>Tenant Registration </h2>
            </div>  
            <div className='ownerReg ownerReg1'>
                <input type="text"  id="name" placeholder='Enter Your Name'></input><br></br>
                {/* <input type="number"  id="rating" min="1" max="5" placeholder='Rate your self out of 5'></input><br></br> */}
                <input type="number"  id="phone" placeholder='Enter Mobile Number'></input><br></br>
                <input type="text" id="walletAdd" value={this.state.account}  placeholder='Enter the Your Wallet Address'></input><br></br>
                <input type="password" id="password"  placeholder='Enter New OAT Password'></input><br></br>
                <button className='giveHouseBtn btn-grad' onClick={this.submitDataToContract}>Register As Tenant</button><br></br>
                {/* Click here to verify status:<button className='verifyDataBtn' onClick={this.verifyData}>Verify Data</button> */}
            </div>
        </div>
        </div>
        );
    }
}

export default tenantRegister;