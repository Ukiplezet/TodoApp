import React, { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import axios from "axios";
import { ReactSortable } from "react-sortablejs";
import ListItem from "../components/notes/ListItem";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  const BASE_URL = "/api/notes";

  const getNotes = async () => {
    const response = await axios.get(BASE_URL);
    setNotes(response.data);
    return;
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>
      <div className="notes-list">
        <ReactSortable list={notes} setList={setNotes}>
          {notes.map((note, index) => {
            return (
              <div key={index} className="note-container">
                <ListItem note={note} />
              </div>
            );
          })}
        </ReactSortable>
        <div className="add-todo-button">
          <AddButton />
        </div>
      </div>
    </div>
  );
};

export default NotesListPage;
