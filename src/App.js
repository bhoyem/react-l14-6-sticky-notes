import React, { Component } from "react";
import NotesList from "./NotesList.js";
import Header from "./Header.js";

class App extends Component {
  state = {
    notes: [],
    searchText: "",
  };

  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true,
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of note being edited
    // updatedKey == will be either "title" or "description" to designate the field being updated.
    // updatedValue == value of title or description to update to.
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  onSearch = (searchTerm) => {
    const searchTermLowered = searchTerm.toLowerCase();
    // const resultingNotesArray = [];
    const searchNotes = this.state.notes.map((note) => {
      if (!searchTermLowered) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(searchTermLowered);
        const descriptionMatch = description.includes(searchTermLowered);
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      searchText: searchTermLowered,
      notes: searchNotes,
    });
  };

  removeNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div className="body">
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          onType={this.onType}
          notes={this.state.notes}
          removeNote={this.removeNote}
          // searchText={this.state.searchText}
        />
      </div>
    );
  }
}

export default App;
