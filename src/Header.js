import React, { Component } from "react";
// import App from "./App.js";

const Header = (props) => {
  const searchTerm = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button className="add-new" onClick={props.addNote}>
          + New Note
        </button>
        <input
          type="text"
          placeholder="Type here to search..."
          className="search"
          value={props.searchText}
          onChange={searchTerm}
        />
      </aside>
    </header>
  );
};

export default Header;
