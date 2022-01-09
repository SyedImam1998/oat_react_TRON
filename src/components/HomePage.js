import React, { Component } from 'react';

class HomePage extends Component {
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