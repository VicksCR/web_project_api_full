import { useState } from "react";

export default function NewCard({ onCardSubmit }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onCardSubmit({ name: title, link });
    setTitle("");
    setLink("");
  }

  return (
    <form
      className="popup__form"
      name="form-add-card"
      id="form-popup-add-card"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__fieldset">
        <input
          type="text"
          id="card-title"
          name="name"
          placeholder="Título"
          className="popup__input"
          minLength="1"
          maxLength="30"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <span
          className="popup__input-error-message"
          id="card-title-error"
        ></span>
      </label>
      <label className="popup__fieldset">
        <input
          type="url"
          id="card-link-to-image"
          name="link"
          placeholder="Enlace a la imagen"
          className="popup__input"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <span
          className="popup__input-error-message"
          id="card-link-to-image-error"
        ></span>
      </label>

      <button type="submit" className="popup__submit-button">
        Crear
      </button>
    </form>
  );
}
