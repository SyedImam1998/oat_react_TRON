import React, { Component } from 'react';
import Web3 from 'web3';
import OatAbi from '../OAT.json';
class HomePage extends Component {
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
                this.setState({
                  OatContract:Oat
                })
      
               
               
              
                
              }catch(e){
                window.alert("Contracts went wrong",e);
                console.log(e)
      
              }
      
          }
      
      
    }
    render() {
        return (
            <div>
                <h1 className='HPTitle'>OAT= OWNER Ʌ Tenant</h1>
                <h3 className='Desc'>Place Where All Details About The House Owner And Tenant Can be Found. We Have A Ledger Which Keeps Track of Every Owner and Every Tenant.   </h3>
                <div className='IpBoxes'>
                    <div className='hpIpBox'>
                      <h3 className='hpTitle'>Owner Registration</h3>  
                      <p>House Owners can register themselves and can be part of the most secure and reliable network and ledger.</p>
                    </div>
                    <div className='hpIpBox'>
                    <h3 className='hpTitle'>Tenant Registration</h3>  
                    
                    <p>Tenant can register themselves and can be part of the most secure and reliable network and ledger.</p>

                    </div>
                    <div className='hpIpBox'>
                    <h3 className='hpTitle'>Owner Records</h3>  
                    <p>This Ledger keeps tracks each and every owner who rented their house to the tenant. Owners can call the tenants past owners to get the details and behaviour of the tenant before renting their house to the tenant. </p>

                    </div>
                    <div className='hpIpBox'>
                    <h3 className='hpTitle'>Tenant Records</h3>  
                    <p>This Ledger keeps track each and every tenant who rented the house of a particular Owner. Tenants can call the past tenants that rented the house of the owner to get the details and behaviour of the owner before renting. </p>

                    </div>
                    
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default HomePage;