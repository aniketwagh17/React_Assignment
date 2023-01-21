import "./Styles/UserDetails.css";
import React from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import swal from "sweetalert";

const EditForm = ({ selectedUserForUpdate, handleClose }) => {
  const id = selectedUserForUpdate.id;
  const [name, setName] = useState(selectedUserForUpdate.name);
  const [email, setEmail] = useState(selectedUserForUpdate.email);
  const [phone, setPhone] = useState(selectedUserForUpdate.phone);
  const [website, setWebsite] = useState(selectedUserForUpdate.website);

  function submitHandler(e) {
    e.preventDefault();

    const regexForWebsite = new RegExp(
      "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"
    );
    if (!regexForWebsite.test(website)) {
      swal("Oops!", "Please Enter Valid Website !!!", "error");
      return;
    }

    const regexForEmail = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
    if (!regexForEmail.test(email)) {
      swal("Oops!", "Please Enter Valid Email ID !!!", "error");
      return;
    }

    selectedUserForUpdate.id = id;
    selectedUserForUpdate.name = name;
    selectedUserForUpdate.email = email;
    selectedUserForUpdate.phone = phone;
    selectedUserForUpdate.website = website;

    handleClose();
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label className="Form-Field-Title required-field">
          Name :{" "}
        </Form.Label>
        <Form.Control
          className="Form-Field"
          label="Name"
          type="text"
          placeholder="Name *"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="Form-Field-Title required-field">
          Email :{" "}
        </Form.Label>
        <Form.Control
          className="Form-Field"
          type="email"
          placeholder="Email *"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="Form-Field-Title required-field">
          Phone :{" "}
        </Form.Label>
        <Form.Control
          className="Form-Field"
          type="text"
          placeholder="Phone *"
          name="phone"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="Form-Field-Title required-field">
          Website :{" "}
        </Form.Label>
        <Form.Control
          className="Form-Field"
          type="text"
          placeholder="Website *"
          name="website"
          value={website}
          required
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Form.Group>
      <hr></hr>

      <div className="btn-group text-muted form-buttons">
        <button
          type="button"
          className="btn btn-light rounded cancel-form-button"
          onClick={handleClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary rounded">
          OK
        </button>
      </div>
    </Form>
  );
};

export default EditForm;
