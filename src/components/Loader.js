import React, { Component } from 'react';
import './components.css';
class Loader extends Component {
    render() {
        return (
            this.props.showLoader?<div className="rollerID"><div class="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div></div>:<div></div>
        );
    }
}

export default Loader;