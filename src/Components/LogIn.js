import React, { Component } from 'react';
import Parse from 'parse';
import { Container, Form, Button, Input } from 'semantic-ui-react';

class LogIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
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
      this.setState({
        logStatus: false
      })
    })
    event.preventDefault();
  }

  logUser(event) {
    console.log(Parse.User.current());
    if (event != null)
      event.preventDefault();
  }

  logIn(event) {
    Parse.User.logIn(this.state.email, this.state.password, {
      success: (user) => {
        console.log("User signed in ")
        this.logUser(null)
        this.setState({
          logStatus : true,
          email: '',
          password: ''
        }, () => {
          this.props.toUpdate(true)
        })
      },
      error: (user) => {
        console.log(user)
        this.setState({
          logStatus : false,
          email: '',
          password: ''
        }, () => {
          this.props.toUpdate(false)
        })
      }
    })

    event.preventDefault();
  }

  componentWillUpdate() {
    if(this.state.logStatus === true)
      console.log("User is cool")
    else
      console.log("No User :-(")
  }

  render() {
    console.log("Update state Login")
    return (
      <div className="LogIn">
        <Container textAlign="center">
          <Form onSubmit={this.logIn}>
            <Form.Field>
              <label>Email</label>
              <Input type="email" value={this.state.email} onChange={this.emailChange} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input type="password" value={this.state.password} onChange={this.passwordChange} />
            </Form.Field>
            <Form.Field control={Button}>Log In</Form.Field>
          </Form>
        </Container>
      </div>
    );
  }
}

export default LogIn;
