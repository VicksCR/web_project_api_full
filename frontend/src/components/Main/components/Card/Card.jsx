import DeleteCardButton from "../../../../images/trash.png";
import RemoveCard from "../NewCard/form/RemoveCard/RemoveCard.jsx";
import ImagePopup from "../ImagePopup/ImagePopup.jsx";

export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { handleOpenPopup } = props;

  const bigImagePopup = {
    title: "",
    variant: "image",
    children: <ImagePopup card={{ name, link }} />,
  };

  const confirmationPopup = {
    title: "¿Estás seguro?",
    variant: "remove-card",
    children: (
      <RemoveCard cardId={props.card._id} onCardDelete={props.onCardDelete} />
    ),
  };

  const cardLikeButtonClassName = `element__like-button ${
    props.card.isLiked ? "element__like-button-active" : ""
  }`;

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      <img
        className="element__delete-button"
        src={DeleteCardButton}
        alt="Button to delete card"
        aria-label="Button to delete card"
        onClick={() => handleOpenPopup(confirmationPopup)}
      />

      <img
        className="element__image"
        src={link}
        alt={name}
        onClick={() => handleOpenPopup(bigImagePopup)}
      />

      <div className="element__group">
        <h2 className="element__title">{name}</h2>

        <button
          aria-label="Like"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
    </div>
  );
}
