import React, { Component } from 'react';
import axios from 'axios';
import './components.css';
import ShowLoader from './Loader';
import Confirmation  from './confirmation';
class ownerRegister extends Component {
    state={
        txId:"",
        showloader:false,
        showConfirmation:false,
        msg:""
    }
    submitDataToContract=async()=>{
        var name=document.getElementById("name").value.toString();
        var hAdd= document.getElementById("hAdd").value.toString();
        var rating= document.getElementById("rating").value.toString();
        var phone= document.getElementById("phone").value.toString();
        var walletAdd= document.getElementById("walletAdd").value.toString();
        var ownerpwd= document.getElementById("walletPassword").value.toString();

        this.setState({
            showloader:true
        })
        await axios.post("/api/SmartContractWallet/call",{
            "amount": "0",
            "contractAddress": "PALv37AFYNTEJh9cEk3yUbaBTuFewZ3G6e",
            "methodName": "setOwner",
            "password": "password",
            "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
            "walletName": "cirrusdev",
            "accountName": "account 0",
            "outpoints": null,
            "feeAmount": "0.001",
            "gasPrice": 100,
            "gasLimit": 25000,
             "parameters":[`4#${name}`,`4#${ownerpwd}`,`4#${hAdd}`,`5#${rating}`,`4#${phone}`,`9#${walletAdd}`,"4#1"]
        }).then(async(response)=>{
            console.log(response)
            if(response.status===200){
                console.log("All Okay");
             var txId=response.data.transactionId;
             console.log("txid:",txId);
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
                   console.log("All went good value saved in Contract");
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
                        msg:"Owner Already Exists!!!"
                    })

                   }
                   
                //    alert("Data Saved SuccessFully!!!");
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

            <div className='glassEffect1'>
            <div className='title'>
                <h2>Owner Registration </h2>
            </div>
                <div className='ownerReg'>
                    <input type="text"  id="name" placeholder='Enter Owner Name'></input><br></br>
                    <input type="text" id="hAdd" placeholder='Enter Owner House Address'></input><br></br>
                    <input type="number"  id="rating" min="1" max="5" placeholder='Rate your self out of 5'></input><br></br>
                    <input type="number"  id="phone" placeholder='Enter Mobile Number'></input><br></br>
                    <input type="text" id="walletAdd" placeholder='Enter the Owners Wallet Address'></input><br></br>
                    <input type="text" id="walletPassword" placeholder='Enter New Owners OAT Passoword'></input><br></br>
                    <button className='giveHouseBtn btn-grad' onClick={this.submitDataToContract}>Register</button><br></br>
                    Click here to verify status:<button className='verifyDataBtn' onClick={this.verifyData}>Verify</button>
                </div>
            </div>
            </div>
        );
    }
}

export default ownerRegister;