export default function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <>
      <img
        id="popup-large-image"
        className="popup__container-image-large"
        src={card.link}
        alt={card.name}
      />
      <h2 id="popup-big-image-title" className="popup__image-title">
        {card.name}
      </h2>
    </>
  );
}
