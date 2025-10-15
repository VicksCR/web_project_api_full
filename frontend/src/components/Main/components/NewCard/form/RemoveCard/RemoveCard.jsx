import { useContext } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";

export default function RemoveCard({ cardId, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete(cardId);
  };

  return (
    <form
      className="popup__form"
      id="popup__form-confirm-delete"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__fieldset">
        <button type="submit" className="popup__submit-button">
          Sí
        </button>
      </label>
    </form>
  );
}
