import React, { Component } from 'react';
import './actionbar.css';
class actionBar extends Component {
    render() {
        return (
            <div className='actionglasseffect'>
                <div className='companyLogo'><a className="link" href="/">OAT</a></div>
                <div className='actionButtons'>
                    <button><a className="link" href="/pastOwner">Tenant Record</a></button>
                    <button><a href="/pastTenant" className="link">Owner Record</a></button>
                    <button><a className="link" href="/registerOwner">Register Owners</a></button>
                    <button><a  className="link" href="/registerTenant">Register Tenants</a></button>
                    <button><a  className="link" href="/giveHouse">Give House</a></button>
                    <button><a  className="link" href="/giveRating">Give Rating</a></button>
                </div>
            </div>
        );
    }
}

export default actionBar;