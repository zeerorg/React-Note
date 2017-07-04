import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Parse from 'parse';
import LogIn from './Components/LogIn'

class App extends Component {

  constructor(props) {
    super(props);
    Parse.initialize("myAppId");
    Parse.serverURL = "https://zeerorg.hopto.org:8000/parse";
    this.logOut(null)
  }

  logOut(event) {
    Parse.User.logOut().then(() => {
      console.log(Parse.User.current())
    })
    if(event) {
      event.preventDefault();
    }
  }

  logUser(event) {
    console.log(Parse.User.current())
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        
        <button onClick={this.logOut} value="Log Out">
          Log Out
        </button>
        <button onClick={this.logUser} value="Log Out">
          Log User
        </button>
        <LogIn />
      </div>
    );
  }
}

export default App;
