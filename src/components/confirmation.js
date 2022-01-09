import React, { Component } from 'react';
import './components.css';

class Confirmation extends Component {
    
        close=()=>{
            this.props.close();
        }
        state={
            alert:"ALERT"
        }
        
        render(){
        
            return (this.props.showConfirmation? (<div id="myModal" class="modal">
            <div className="modal-content">
                <div className="modal-header">
                   
                    <h3>{this.props.msg===""?"Confirmation":this.state.alert}</h3>
                </div>
                <div className="modal-body">
                    <p className='wakeup'>{this.props.msg===""?"Your Data Has Been Saved SuccessFully!!!":this.props.msg}</p>
    
                </div>
                <div className="modal-footer">
                    <button className="btnSell" onClick={this.close}>OKAY</button>
                </div>
            </div>
    
        </div>):<div></div>)

        }
       
    }


export default Confirmation;