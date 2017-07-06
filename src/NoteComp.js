import React, { Component } from 'react';
import Parse from 'parse';
import { Segment } from 'semantic-ui-react';
import NotesList from './Components/NotesList';
import AddNote from './Components/AddNote';
import EditNote from './Components/EditNote';

class NoteComp extends Component {

  constructor(props) {
    super(props);

    this.state = {
        notesList: [],
        toUpdate: null
    }
    this.updateList = this.updateList.bind(this)
    this.addNewNote = this.addNewNote.bind(this)
    this.editNote = this.editNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
    this.cancelUpdate = this.cancelUpdate.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.updateList()
  }

  addNewNote(text, title) {
    var Note = Parse.Object.extend("Note");
    var note = new Note();
    var t = new Date().getTime()
    console.log(t)
    note.set("data", text);
    note.set("title", title);
    note.set("user", Parse.User.current().get("username"));
    note.set("timestamp", t);
    note.set("identifier", t);

    note.save(null, {
        success: (note) => {
            // Execute any logic that should take place after the object is saved.
            this.updateList()
            console.log(note.get("identifier"));
        },
        error: (note, error) => {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and message.
            alert('Failed to create new object, with error code: ' + error.message);
        }
    });
  }

  updateList() {
    var Note = Parse.Object.extend("Note");
    var query = new Parse.Query(Note);
    query.equalTo("user", Parse.User.current().get("username"));
    query.find({
        success: (notes) => {
            this.setState({
                notesList: notes
            })
        },
        error: () => {
            console.log("Error in retrieving notes")
        }
    })
  }

  editNote(note) {
      //console.log(note.get("data"));
      this.setState({
          toUpdate: note
      })
  }

  updateNote(note, text, title) {
      if(text === note.get("data") && title === note.get("title"))
        return
      note.set("data", text);
      note.set("title", title);
      note.set("timestamp", new Date().getTime());
      note.save(null, {
          success: (note) => {
            this.setState({
                toUpdate: null
            });
          },
          error: (note, err) => {
              console.log(err);
          }
      })
  }

  cancelUpdate() {
      this.setState({
          toUpdate: null
      });
  }

  deleteNote(note) {
      note.destroy({
          success: (note) => {
              this.updateList();
          },
          error: (note, err) => {
              console.log(err);
          }
      })
  }

  render() {
      var editNoteElement = <EditNote updateNote={this.updateNote} tobeUpdated={this.state.toUpdate} cancelUpdate={this.cancelUpdate}/>
      if(this.state.toUpdate === null)
        editNoteElement = <div></div>

      return (
        <Segment style={{margin: "30px"}}>
            <AddNote addNewNote={this.addNewNote}/>
            <NotesList notesList={this.state.notesList} editNote={this.editNote} deleteNote={this.deleteNote} />
            {editNoteElement}
        </Segment>
      )
  }

}

export default NoteComp;