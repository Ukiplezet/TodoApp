import React, { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/chevron-left.svg";
import { Button, Form, FloatingLabel, Row } from "react-bootstrap";
import api from "../../utils/api";

const NewNotePage = ({ match, history }) => {
  const [user, setUser] = useState("1");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [enableButton, setEnableButton] = useState(true);

  const handleSubmit = async () => {
    const note = {
      user: user,
      title: title,
      description: description,
    };
    const response = await api.createNote(note);

    history.push("/");
    return response;
  };

  useEffect(() => {
    if (title && description) {
      setEnableButton(false);
    }
  }, [title, description]);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft
            label="Discard"
            onClick={() => {
              history.push("/");
            }}
          />
        </h3>
        <div>
          <Button
            className="btn btn-success note-submit-button"
            disabled={enableButton}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="new-note-form">
        <Row>
          <Form className="mx-1">
            <FloatingLabel
              className="mb-2 notes-page-title me-2 text-light"
              controlId="floatingTitle"
              label="Title"
            >
              <Form.Control
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                name="title"
                type="text"
                as="input"
                value={title}
              />
            </FloatingLabel>
            <FloatingLabel
              className="mb-2 me-2 text-light"
              controlId="floatingDescription"
              label="Description"
            >
              <Form.Control
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                as="textarea"
                style={{ height: "30vh" }}
                value={description}
              />
            </FloatingLabel>
          </Form>
        </Row>
      </div>
    </div>
  );
};

export default NewNotePage;
