import React, { Component } from 'react';
import Parse from 'parse';
import { Container, Form, Button, Input } from 'semantic-ui-react';
import sweetAlert from 'sweetalert'

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
    this.signUp = this.signUp.bind(this);
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
    event.preventDefault();
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
        sweetAlert("Oops...", "Cannot Sign In! Try Again.", "error");
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

  signUp(event) {
    event.preventDefault();
    var user = new Parse.User();
    user.set("username", this.state.email);
    user.set("password", this.state.password);
    user.set("email", this.state.email);
    user.signUp(null, {
      success: (user) => {
        // Hooray! Let them use the app now.
        this.setState({
          logStatus : true,
          email: '',
          password: ''
        }, () => {
          this.props.toUpdate(true);
        })
      },
      error: (user, error) => {
        // Show the error message somewhere and let the user try again.
        console.log("Error: " + error.code + " " + error.message);
        sweetAlert("Oops...", "Cannot Register! Try Again.", "error");
        this.setState({
          logStatus : false,
          email: '',
          password: ''
        }, () => {
          this.props.toUpdate(false);
        })
      }
    });
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
            <Form.Group>
              <Form.Field control={Button} primary>Log In</Form.Field>
              <Button onClick={this.signUp}>Register</Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default LogIn;
