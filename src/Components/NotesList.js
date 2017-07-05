import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';

class NotesList extends Component {
  
  constructor(props) {
      super(props)

      this.editNote = this.editNote.bind(this)
      this.deleteNote = this.deleteNote.bind(this)
  }

  editNote(note) {
      this.props.editNote(note);
  }

  deleteNote(note) {
      this.props.deleteNote(note)
  }

  render() {
      this.props.notesList.reverse()
    var renderNotesList = this.props.notesList.map((note) => {
        return (
            <List.Item key={note.id} style={{padding: '10px', paddingBottom: '2px'}}>
                <List.Content>
                    <List.Header style={{float: "left"}}>{note.get("data")}</List.Header>
                    <Button negative icon style={{float: "right"}} onClick={() => this.deleteNote(note)}>
                        <Icon name='remove' />
                    </Button>
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