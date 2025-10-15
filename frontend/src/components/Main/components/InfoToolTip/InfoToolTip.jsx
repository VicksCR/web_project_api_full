import React from "react";
import "../../../../blocks/infotooltip.css";
import failImage from "../../../../images/fail.png";
import successImage from "../../../../images/success.png";
import Popup from "../../components/Popup/Popup";

export default function InfoToolTip({ isOpen, isSuccess, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} variant="infotooltip">
      <img
        src={isSuccess ? successImage : failImage}
        alt={isSuccess ? "Éxito" : "Error"}
        className="infotooltip__image"
      />
      <p className="infotooltip__text">
        {isSuccess
          ? "¡Correcto! Ya estás registrado."
          : "Uy, algo salió mal. Por favor, inténtalo de nuevo."}
      </p>
    </Popup>
  );
}
