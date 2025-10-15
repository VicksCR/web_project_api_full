import { useRef } from "react";

export default function EditAvatar({ onUpdateAvatar }) {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="popup__form"
      name="popup-form-avatar"
      id="popup__form-avatar"
      noValidate
    >
      <label className="popup__fieldset">
        <input
          ref={inputRef}
          type="url"
          id="avatar-link"
          name="avatar"
          placeholder="Enlace de imagen de perfil"
          className="popup__input"
          required
        />
        <span
          className="popup__input-error-message"
          id="avatar-link-error"
        ></span>
      </label>
      <button type="submit" className="popup__submit-button">
        Guardar
      </button>
    </form>
  );
}
