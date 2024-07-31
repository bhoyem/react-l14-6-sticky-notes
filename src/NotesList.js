import React, { Component } from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepSearchMatches);

  const renderNote = (note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );

  const notesArray = searchMatches.map(renderNote);

  return <ul className="notes-list">{notesArray}</ul>;
};

export default NotesList;
