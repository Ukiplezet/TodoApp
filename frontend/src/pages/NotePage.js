import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg";
import { Button } from "react-bootstrap";
import NewNotePage from "../components/notes/NewNotePage";

const NotePage = ({ match, history }) => {
  const noteId = match.params.id;
  const [note, setNote] = useState(null);
  const [enableButton, setEnableButton] = useState(true);

  const BASE_URL = "/api/notes";

  const getNote = async (noteId) => {
    if (noteId === "new") return;
    const response = await axios.get(`${BASE_URL}/${noteId}`);
    setNote(response.data);
  };

  const handleDescriptionChange = (value) => {
    setEnableButton(false);
    return setNote((note) => ({ ...note, description: value }));
  };
  const handleTitleChange = (value) => {
    setEnableButton(false);
    return setNote((note) => ({ ...note, title: value }));
  };

  const handleSubmitChanges = async () => {
    if (note.title === "") {
      return alert("Note must have a title!");
    }
    const response = await api.updateNote(note);
    setNote(response);

    history.push("/");
    return response;
  };

  const handleDeleteNote = async () => {
    const response = await api.deleteNote(note);
    alert(response);
    history.push("/");
  };

  useEffect(() => {
    getNote(noteId);
  }, [noteId]);

  useEffect(() => {
    if (note?.title === "") {
      setEnableButton(true);
    }
  }, [note?.title]);

  if (noteId === "new") {
    return <NewNotePage history={history} />;
  }
  return (
    <div className="note" key={noteId}>
      <div className="note-header">
        <h3>
          <ArrowLeft
            onClick={() => {
              history.push("/");
            }}
            // disabled={enableButton}
          />
        </h3>
        <div>
          <Button
            className=" btn btn-danger note-delete-button"
            onClick={handleDeleteNote}
          >
            Delete
          </Button>
          <Button
            className="btn btn-success note-submit-button"
            disabled={enableButton}
            onClick={handleSubmitChanges}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="notes-page-title">
        <input
          value={note?.title}
          label="title"
          type="text"
          onChange={(e) => {
            handleTitleChange(e.target.value);
          }}
        ></input>
      </div>

      <textarea
        onChange={(e) => {
          handleDescriptionChange(e.target.value);
        }}
        spellCheck="false"
        value={note?.description}
      ></textarea>
    </div>
  );
};

export default NotePage;
