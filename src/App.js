import React, { Component } from 'react';
import { Menu, Modal, List } from 'semantic-ui-react'
// import logo from './logo.svg';
import './App.css';
import Parse from 'parse';
import LogIn from './Components/LogIn';

class App extends Component {

  constructor(props) {
    super(props);
    Parse.initialize("myAppId");
    Parse.serverURL = "https://zeerorg.hopto.org:8000/parse";

    var st = false
    if(Parse.User.current())
      st = true

    this.state = {
      logStatus: st
    }


    this.updateLogState = this.updateLogState.bind(this)
    this.logOut = this.logOut.bind(this)
    this.updateLogState = this.updateLogState.bind(this)
    this.logUser = this.logUser.bind(this)
  }

  updateLogState(state) {
    this.setState({
      logStatus: state
    })
  }

  logOut(event) {
    Parse.User.logOut().then(() => {
      console.log(Parse.User.current())
      this.updateLogState(false)
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
    var user = <div></div>
    if(this.state.logStatus)
      user = <Menu.Item header>{Parse.User.current().get("username")}</Menu.Item>;

    return (
      <div className="App">
        <Menu pointing secondary size="massive">
          <Menu.Item header>My Notes</Menu.Item>
          {user}
          <Menu.Menu position="right">
            <Menu.Item name='Log Out' onClick={this.logOut}/>
          </Menu.Menu>
        </Menu>
        {/*<Segment>
          <LogIn />
        </Segment>*/}
        {/*<List divided verticalAlign='middle' size="massive">
          <List.Item style={{padding: '30px'}}>
            <List.Content>
              <List.Header as='a'>Daniel Louise</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='a'>Stevie Feliciano</List.Header>
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <List.Header as='a'>Elliot Fu</List.Header>
            </List.Content>
          </List.Item>
        </List>*/}
        <Modal open={this.state.logStatus === false} size="small">
          <Modal.Header>Log In</Modal.Header>
          <Modal.Content>
            <LogIn toUpdate={this.updateLogState} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default App;
