import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

class NotesList extends Component {
  
  constructor(props) {
      super(props)

      this.editNote = this.editNote.bind(this)
  }

  editNote(note) {
      this.props.editNote(note);
  }

  render() {
    var renderNotesList = this.props.notesList.map((note) => {
        return (
            <List.Item key={note.id} style={{padding: '15px'}}>
                <List.Content>
                    <List.Header style={{float: "left"}}>{note.get("data")}</List.Header>
                    <Button icon style={{float: "right"}} onClick={() => this.editNote(note)}>
                        <Icon name='write' />
                    </Button>
                </List.Content>
            </List.Item>
        )
    })
    
    return (
        <List divided verticalAlign='middle' size="huge" style={{margin: '30px'}}>
            {renderNotesList}
        </List>
    );
  }
}

export default NotesList;