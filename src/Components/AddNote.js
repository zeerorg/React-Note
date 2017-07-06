import React, { Component } from 'react';
import { Form, TextArea, Button, Container } from 'semantic-ui-react';

class AddNote extends Component {

  constructor(props) {
    super(props);

    this.state = {
        text: "",
        title: ""
    }

    this.textChange = this.textChange.bind(this)
    this.titleChange = this.titleChange.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  addNote() {
      this.setState({
        text: "",
        title: ""
      })
      this.props.addNewNote(this.state.text, this.state.title)
  }

  textChange(event) {
      this.setState({
        text: event.target.value
      })
  }

  titleChange(event) {
      this.setState({
        title: event.target.value
      })
  }

  render() {
      return (
        <Container textAlign="center">
          <Form onSubmit={this.addNote}>
            <Form.Input placeholder="Title" style={{marginTop: '10px' }} value={this.state.title} onChange={this.titleChange}/>
            <TextArea placeholder="Description" style={{ minHeight: 100, marginBottom: '30px', marginTop: '10px' }} value={this.state.text} onChange={this.textChange}/>
            <Form.Field control={Button}>Add</Form.Field>
          </Form>
        </Container>
      )
  }
}

export default AddNote