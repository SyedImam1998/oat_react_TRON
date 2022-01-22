import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';
import Confirmation  from './confirmation';
class tenantRegister extends Component {

state={
    txId:"",
    showloader:false,
    showConfirmation:false,
    msg:""
}
    
        submitDataToContract=async()=>{
            var name=document.getElementById("name").value.toString();
            var rating= "0";
            var phone= document.getElementById("phone").value.toString();
            var walletAdd= document.getElementById("walletAdd").value.toString();
            var pwd=document.getElementById("password").value.toString();
            this.setState({
                showloader:true
            })
            await axios.post("/api/SmartContractWallet/call",{
                "amount": "0",
                "contractAddress": "PU8X3HSBKGZiv2tr8gfgx8NiuzGkEPnodM",
                "methodName": "setTenantFromFront_end",
                "password": "password",
                "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                "walletName": "cirrusdev",
                "accountName": "account 0",
                "outpoints": null,
                "feeAmount": "0.001",
                "gasPrice": 100,
                "gasLimit": 25000,
                 "parameters":[`4#${name}`,`5#${rating}`,`4#${phone}`,`9#${walletAdd}`,`4#${pwd}`]
            }).then((response)=>{
                if(response.status===200){
                    console.log("All Okay");
                 var txId=response.data.transactionId;
                 this.setState({
                    txId:txId
                },()=>{
                    this.verifyData();
                })
                }
            }).catch((e)=>{
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
                        document.getElementById("name").value="";
                         document.getElementById("phone").value="";
                        document.getElementById("walletAdd").value="";
                        document.getElementById("password").value="";
    
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
                <input type="text" id="walletAdd"  placeholder='Enter the Your Wallet Address'></input><br></br>
                <input type="password" id="password"  placeholder='Enter New OAT Password'></input><br></br>
                <button className='giveHouseBtn btn-grad' onClick={this.submitDataToContract}>Register As Tenant</button><br></br>
                Click here to verify status:<button className='verifyDataBtn' onClick={this.verifyData}>Verify Data</button>
            </div>
        </div>
        </div>
        );
    }
}

export default tenantRegister;