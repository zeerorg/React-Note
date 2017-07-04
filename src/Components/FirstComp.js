import React, { Component } from 'react';
// import logo from './logo.svg';

class FirstComp extends Component {
  render() {
    return (
      <div className="first-component">
        {/*<div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <p>Hello {this.props.name}</p>
      </div>
    );
  }
}

export default FirstComp;
