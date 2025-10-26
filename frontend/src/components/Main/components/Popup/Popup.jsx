import popupCloseIcon from "../../../../images/close-icon.png";
import { useEffect } from "react";

export default function Popup({
  onClose,
  title,
  children,
  variant = "",
  isOpen = false,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const containerClass = `popup__container 
    ${variant ? `popup__container-${variant}` : ""} 
    ${!title ? "popup__container-image" : ""}
  `.trim();

  return (
    <div
      className={`popup ${isOpen ? "popup__opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className={containerClass}>
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

/*
ESTA VERSION SI FUNCIONA BIEN, REVISAR SI LA OTRA NUEVA TAMBIEN Y SI NO DEJAR

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
*/
