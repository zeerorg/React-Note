import React, { Component } from 'react';
import Parse from 'parse';
import { Container, Form } from 'semantic-ui-react';

class LogIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logStatus: false,
      email: '',
      password: ''
    }

    this.logOut = this.logOut.bind(this);
    this.logUser = this.logUser.bind(this);
    this.logIn = this.logIn.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  emailChange(event) {
    this.setState({
      email: event.target.value
    })
  }

  passwordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  logOut(event) {
    Parse.User.logOut().then(() => {
      console.log(Parse.User.current());
    })
    event.preventDefault();
  }

  logUser(event) {
    console.log(Parse.User.current());
    event.preventDefault();
  }

  logIn(event) {
    Parse.User.logIn(this.state.email, this.state.password, {
      success: function(user) {
        console.log(user)
        this.setState({
          logStatus : true,
          email: '',
          password: ''
        })
      },
      error: function(user) {
        console.log(user)
        this.setState({
          logStatus : false,
          email: '',
          password: ''
        })
      }
    })

    event.preventDefault();
  }

  render() {
    return (
      <div className="LogIn">
        <Container textAlign="center">
        <form onSubmit={this.logIn}>
          <label>
            Name:
            <input id="user_email" type="email" value={this.state.email} onChange={this.emailChange} />
          </label>
          <label>
            Password:
            <input id="user_password" type="password" value={this.state.password} onChange={this.passwordChange} />
          </label>
          <input type="submit" value="Log In" />
        </form>
        </Container>
      </div>
    );
  }
}

export default LogIn;
