import axios from 'axios';
import React, { Component } from 'react';
import './components.css';
import ShowLoader from './Loader';
import Confirmation  from './confirmation';
class giveHouse extends Component {

    state={
        txId:"",
        showloader:false,
        showConfirmation:false,
        msg:""
    }
    giveHouse=async()=>{
        var ownerWalletAddress= document.getElementById("ownerAdd").value.toString();
        var ownerpwd= document.getElementById("ownerpwd").value.toString();
        var tenantWalletAddress= document.getElementById("tenantAdd").value.toString();
        this.setState({
            showloader:true
        })
        axios.post("/api/SmartContractWallet/call",

        {
            "amount": "0",
            "contractAddress": "PU8X3HSBKGZiv2tr8gfgx8NiuzGkEPnodM",
            "methodName": "Givehouse",
            "password": "password",
            "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
            "walletName": "cirrusdev",
            "accountName": "account 0",
            "outpoints": null,
            "feeAmount": "0.001",
            "gasPrice": 100,
            "gasLimit": 25000,
            "parameters":[`9#${ownerWalletAddress}`,`4#${ownerpwd}`,`9#${tenantWalletAddress}`]
        }
        ).then(async(response)=>{
            console.log(response)
            if(response.status===200){
                console.log("All Okay");
             var txId=response.data.transactionId;
             console.log("txid:",txId);
             this.setState({
                 txId:txId
             },()=>{
                this.verifyData();
            }
             )
             
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
                    if(response.data.returnValue==="All okay")
                    {
                        console.log("All went good value saved in Contract");
                        //    alert("Data Saved SuccessFully!!!");
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:""
                        })
                        document.getElementById("ownerAdd").value="";
                         document.getElementById("ownerpwd").value="";
                        document.getElementById("tenantAdd").value="";

                    }else{
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:"Owner Password Incorrect."
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
                <h2>Give House </h2>
            </div> 
                <div className='ownerReg ownerReg1'>
                <input type="text" id="ownerAdd" placeholder='Enter the Owner Wallet Address'></input><br></br>
                <input type="password" id="ownerpwd"  placeholder='Enter the Owner OAT Password'></input><br></br>
                <input type="text" id="tenantAdd" placeholder='Enter the Tenant Wallet Address'></input><br></br>
                <button className="giveHouseBtn btn-grad" onClick={this.giveHouse}>Give House</button><br></br>
                Click here to verify status: <button className='verifyDataBtn' onClick={this.verifyData}>Verify Data</button>
                </div>
                
            </div>
            </div>

        );
    }
}

export default giveHouse;