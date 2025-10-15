import { useState, useContext, useEffect, useRef } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const inputRef = useRef();
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className="popup__form"
      name="popup-form-edit"
      id="popup-form-edit"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__fieldset">
        <input
          type="text"
          ref={inputRef}
          id="first-name"
          name="name"
          placeholder="Nombre"
          className="popup__input"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span
          className="popup__input-error-message"
          id="first-name-error"
        ></span>
      </label>
      <label className="popup__fieldset">
        <input
          type="text"
          ref={inputRef}
          id="about-me"
          name="about"
          placeholder="Acerca de mí"
          className="popup__input"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__input-error-message" id="about-me-error"></span>
      </label>
      <button type="submit" className="popup__submit-button">
        Guardar
      </button>
    </form>
  );
}
