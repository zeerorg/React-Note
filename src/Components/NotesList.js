import React, { Component } from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

class NotesList extends Component {
  
  constructor(props) {
      super(props)

      this.editNote = this.editNote.bind(this)
      this.deleteNote = this.deleteNote.bind(this)
      this.getNoteList = this.getNoteList.bind(this)
  }

  editNote(note) {
      this.props.editNote(note);
  }

  deleteNote(note) {
      this.props.deleteNote(note)
  }

  getNoteList(mainStyle={
                    listStyle: {margin: '5px'}, 
                    itemStyle: {padding: '10px', paddingBottom: '10px', paddingTop: '10px'}, 
                    descriptionStyle: {float: "left", maxWidth: '1000px', textAlign:'left', marginTop: '5px'}
                })
    {
      mainStyle.descriptionStyle["textAlign"] = "justify"
      this.props.notesList.reverse()
      var renderNotesList = this.props.notesList.map((note) => {
        var noteTitle = <div></div>
        if(note.get("title"))
            noteTitle = <div><List.Header style={{float: "left"}}>{note.get("title")}</List.Header><br/></div>
        return (
            <List.Item key={note.id} style={mainStyle.itemStyle}>
                <List.Content>
                    {noteTitle}
                    <List.Description style={mainStyle.descriptionStyle}>{note.get("data")}</List.Description>
                    <Button negative icon style={{float: "right", margin: '5px'}} onClick={() => this.deleteNote(note)}>
                        <Icon name='remove' />
                    </Button>
                    <Button icon style={{float: "right", margin:'5px'}} onClick={() => this.editNote(note)}>
                        <Icon name='write' />
                    </Button>
                </List.Content>
            </List.Item>
        )
    })
    return <List divided verticalAlign='middle' size="huge" style={mainStyle.listStyle}>
             {renderNotesList}
        </List>
  }

  render() {    
    return (
        <MediaQuery minWidth={500}>
            {(matches) => {
                if (matches) {
                    return this.getNoteList()
                } else {
                    return this.getNoteList({
                        listStyle: {margin: '0px'}, 
                        itemStyle: {padding: '5px', paddingBottom: '10px', paddingTop: '10px'}, 
                        descriptionStyle: {float: "left", maxWidth: '80%', textAlign:'left', marginTop: '2px', fontSize: '70%'}
                    })
                }
            }}
        </MediaQuery>
    );
  }
}

export default NotesList;