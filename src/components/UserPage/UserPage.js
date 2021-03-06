import React, { Component } from 'react';
import { connect } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  hooksToDoNav=()=>{
    this.props.history.push('todo')
  }
  calcNav=()=>{
    this.props.history.push('calculator')
  }
  render() {
    
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <button>Ecommerce</button><br/>
        <button>ManaDork</button><br/>
        <button>EveryEvent</button><br/>
        <button onClick={this.hooksToDoNav}>ToDo w/ MUI and Hooks</button><br/>
        <button onClick={this.calcNav}>Calculator</button><br/>

        

        {/* <LogOutButton className="log-in" /> */}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
