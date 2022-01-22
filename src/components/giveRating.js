import React, { Component } from 'react';
import ShowLoader from './Loader';
import Confirmation from './confirmation';
import './components.css';
import axios from 'axios';
class giveRating extends Component {
    state={
        txId:"",
        showloader:false,
        showConfirmation:false,
        msg:"",
        screen:"owner"
    }

    giveRating=()=>{
        var Address1= document.getElementById("add1").value.toString();
        var pwd= document.getElementById("password").value.toString();
        var Address2= document.getElementById("add2").value.toString();
        var rating= document.getElementById("rating").value.toString();
        if(Address1===""||pwd===""||Address2===""||rating===""){
            alert("All The Fields Needs To Be Filled !!!")
            return;
        }
        this.setState({
            showloader:true
        })
        if(this.state.screen==="owner"){
            axios.post("/api/SmartContractWallet/call",{
                "amount": "0",
                "contractAddress": "PGHQj1bRntTmg3atP2923Ruu1n3i9WiYmc",
                "methodName": "setRatingForOwner",
                "password": "password",
                "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                "walletName": "cirrusdev",
                "accountName": "account 0",
                "outpoints": null,
                "feeAmount": "0.001",
                "gasPrice": 100,
                "gasLimit": 25000,
                 "parameters":[`9#${Address2}`,`9#${Address1}`,`4#${pwd}`,`5#${rating}`]
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
                }
                 )
                 
                }
            }).catch((e)=>{
                this.setState({
                    showloader:false,
                   
                 })
            })

        }else{
            axios.post("/api/SmartContractWallet/call",{
                "amount": "0",
                "contractAddress": "PGHQj1bRntTmg3atP2923Ruu1n3i9WiYmc",
                "methodName": "setRatingForTenant",
                "password": "password",
                "sender": "PJ9pf2fdzf2oWbeCJWWBXMuBERsZywKSCd",
                "walletName": "cirrusdev",
                "accountName": "account 0",
                "outpoints": null,
                "feeAmount": "0.001",
                "gasPrice": 100,
                "gasLimit": 25000,
                 "parameters":[`9#${Address1}`,`9#${Address2}`,`4#${pwd}`,`5#${rating}`]
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
                }
                 )
                 
                }
            }).catch((e)=>{
                this.setState({
                    showloader:false,
                   
                 })
            })
            

        }
        
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
                    if(response.data.returnValue==="rating saved")
                    {
                        console.log("All went good value saved in Contract");
                        //    alert("Data Saved SuccessFully!!!");
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:""
                        })
                         document.getElementById("add1").value=""
                         document.getElementById("password").value=""
                         document.getElementById("add2").value=""
                       document.getElementById("rating").value=""
                    }else if(response.data.returnValue==="Please check the Owner Wallet Address.You have never rented this owner house."||"Please check the Tenant Wallet Address.You have never given house to this tenant."){
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:response.data.returnValue
                        })
                        

                    }else if(response.data.returnValue==="Tenant Password Incorrect."||"Owner Password Incorrect."){
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:response.data.returnValue
                        })

                    }else{
                        this.setState({
                            showloader:false,
                            showConfirmation:!this.state.showConfirmation,
                            msg:"Something went wrong!!!"
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
    changeToOwner=()=>{
        document.getElementsByClassName("rateOwner")[0].style.background="rgba(255, 255, 255, 0.32)";
        document.getElementsByClassName("rateTenant")[0].style.background="none";
        
        this.setState({
            screen:"owner",
        })
    }
    changeToTenant=()=>{
        document.getElementsByClassName("rateOwner")[0].style.background="none";
        document.getElementsByClassName("rateTenant")[0].style.background="rgba(255, 255, 255, 0.32)";
        
        this.setState({
            screen:"tenant",
        })
    }
    render() {
        return (
            <div>
                <Confirmation msg={this.state.msg} showConfirmation={this.state.showConfirmation}  close={this.close}></Confirmation>
                <ShowLoader showLoader={this.state.showloader}></ShowLoader>
                <button className='rateOwner' onClick={this.changeToOwner}>Rate A Owner</button>
                <button className='rateTenant' onClick={this.changeToTenant}>Rate A Tenant</button>
            <div className='glassEffect2 ratingbg'>
                
            <div className='title ratingT'>
                <h2>{this.state.screen==="owner"?"Rate A Owner":"Rate A Tenant"}</h2>
                {/* {this.state.screen==="owner"?"Enter the Owner Wallet Address":"Enter the Tenant Wallet Address" }*/}
            </div> 
                <div className='ownerReg ownerReg1 ratingReg'>
                <input type="text" id="add1" placeholder="Enter the Your Wallet Address"></input><br></br>
                <input type="password" id="password"  placeholder="Enter the Your OAT Password"></input><br></br>
                <input type="text" id="add2" placeholder={this.state.screen==="owner"?"Enter the Owner Wallet Address":"Enter the Tenant Wallet Address" }></input><br></br>
                <input type="number" min="1" max="5" id="rating" placeholder={this.state.screen==="owner"?"Enter Your Rating Here":"Enter Your Rating Here" }></input><br></br>
                <button className="giveHouseBtn btn-grad" onClick={this.giveRating}>Give Rating</button><br></br>
                Click here to verify status: <button className='verifyDataBtn' onClick={this.verifyData}>Verify Data</button>
                </div>
                
            </div>
            </div>

        );
    }
}

export default giveRating;