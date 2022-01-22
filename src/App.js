import React, { Component } from 'react';
import ActionBar from './ActionBar/actionBar';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import OwnerRegister   from './components/ownerRegister';
import TenantRegister from './components/tenantRegister';
import PastOwners from './components/pastOwners';
import PastTenants  from './components/pastTenants';
import HomePage from './components/HomePage';
import GiveHouse from './components/giveHouse';
import GiveRating  from './components/giveRating';
class App extends Component {
  render() {
    return (
      <div className="bg">
        
        
        {/* <OwnerRegister></OwnerRegister> */}
    
        <Router>
        <ActionBar></ActionBar>
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/registerOwner"component={OwnerRegister}></Route>
          <Route exact path="/registerTenant"component={TenantRegister}></Route>
          <Route exact path="/pastOwner"component={PastOwners}></Route>
          <Route exact path="/pastTenant"component={PastTenants}></Route>
          <Route exact path="/giveHouse" component={GiveHouse}></Route>
          <Route exact path="/giveRating" component={GiveRating}></Route>
        </Switch>

        </Router>
        
        
        
      </div>
    );
  }
}

export default App;


