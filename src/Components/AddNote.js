import React, { Component } from 'react';
import { Form, TextArea, Button, Container } from 'semantic-ui-react';

class AddNote extends Component {

  constructor(props) {
    super(props);

    this.state = {
        text: ""
    }

    this.textChange = this.textChange.bind(this)
    this.addNote = this.addNote.bind(this)
  }

  addNote() {
      this.props.addNewNote(this.state.text)
  }

  textChange(event) {
      this.setState({
        text: event.target.value
      })
  }

  render() {
      return (
        <Container textAlign="center">
          <Form onSubmit={this.addNote}>
            <TextArea placeholder="Add a note" style={{ minHeight: 100, marginBottom: '30px', marginTop: '30px' }} value={this.state.text} onChange={this.textChange}/>
            <Form.Field control={Button}>Add</Form.Field>
          </Form>
        </Container>
      )
  }
}

export default AddNote