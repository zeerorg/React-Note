import React, { Component } from 'react';
import { Form, TextArea, Button, Modal } from 'semantic-ui-react';

class EditNote extends Component {

  constructor(props) {
    super(props);

    this.state = {
        text: this.props.tobeUpdated.get("data")
    }

    this.textChange = this.textChange.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  updateNote() {
      this.props.updateNote(this.props.tobeUpdated, this.state.text);
  }

  textChange(event) {
      this.setState({
        text: event.target.value
      });
  }

  render() {
      return (
        <Modal open={true} size="small">
          <Modal.Header>Edit</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.updateNote}>
                <TextArea placeholder="Edit Note" style={{ minHeight: 100, marginBottom: '30px' }} value={this.state.text} onChange={this.textChange}/>
                <Form.Group>
                    <Form.Button primary>Okay</Form.Button>
                    <Button negative onClick={this.props.cancelUpdate}>Cancel</Button>
                </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
      );
  }
}

export default EditNote;