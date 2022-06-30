import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Form, Col, Row } from "react-bootstrap";

const ListItem = ({ note }) => {
  const { id, is_completed, created } = note;
  const [checked, setChecked] = useState(false);
  const [completedNote, setCompletedNote] = useState(note.date_completed);
  const getTime = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getTitle = (note) => {
    let title = note.title.split("\n")[0];
    if (title.length > 45) {
      return title.slice(0, 45);
    }
    return title;
  };

  const getContent = (note) => {
    const title = getTitle(note);
    let content = note.description.replaceAll("\n", " ");
    content = content.replaceAll(title, "");

    if (content.length > 45) {
      return content.slice(0, 45) + "...";
    } else {
      return content;
    }
  };

  const handleNoteComplete = async (event) => {
    note.is_completed = event.target.checked;
    setChecked((prev) => !checked);
    const response = await api.updateNote(note);
    console.log(response);
    note = { ...response };
    console.log(note.date_completed);
    return setCompletedNote(note.date_completed);
  };

  useEffect(() => {
    if (is_completed) {
      setChecked(true);
    }
  }, [is_completed]);

  return (
    <Col className="d-flex flex-row align-items-baseline">
      <Form.Check
        type="checkbox"
        className="list-item-checkbox d-flex flex-row  ms-3"
        id={`default-checkbox-${id}`}
        checked={is_completed}
        label=""
        value={note}
        onChange={(event) => handleNoteComplete(event)}
      />
      <Link
        key={id}
        to={`/note/${id}`}
        className="notes-list-item text-decoration-none d-flex flex-row w-100"
      >
        <Col
          style={
            is_completed
              ? {
                  textDecoration: "line-through",
                  textDecorationThickness: "0.2rem",
                }
              : {}
          }
        >
          <h4>{getTitle(note)}</h4>
          <Row>
            <p>{getContent(note)}</p>
            <p>{getTime(created)}</p>
          </Row>
        </Col>
        <div
          style={
            is_completed
              ? {
                  display: "flex",
                  flexFlow: "row",
                  alignItems: "start",

                  zIndex: 100,
                  overflow: "inherit",
                }
              : { display: "none" }
          }
        >
          <p>Completed on: {getTime(completedNote)}</p>
        </div>
      </Link>
    </Col>
  );
};

export default ListItem;
