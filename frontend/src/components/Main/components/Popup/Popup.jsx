import popupCloseIcon from "../../../../images/close-icon.png";

export default function Popup(props) {
  const { onClose, title, children, variant = "", isOpen = true } = props;
  if (!isOpen) return null;

  return (
    <div className={`popup ${isOpen ? "popup__opened" : ""}`}>
      <div
        className={`popup__container ${
          variant ? `popup__container-${variant}` : ""
        }
        ${!title ? "popup__container-image " : ""}`}
      >
        <button
          aria-label="Close pop-up window"
          className="popup__close-image-button"
          type="button"
          onClick={onClose}
        >
          <img
            className="popup__close-image"
            src={popupCloseIcon}
            alt="Icon to close popup"
          />
        </button>

        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
