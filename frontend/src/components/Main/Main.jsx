import { useContext } from "react";
import editButton from "../../images/edit-button.png";
import addButton from "../../images/add-button.png";
import Popup from "./components/Popup/Popup.jsx";
import Card from "./components/Card/Card.jsx";
import NewCard from "./components/NewCard/form/NewCard.jsx";
import EditProfile from "./components/EditProfile/form/EditProfile.jsx";
import EditAvatar from "./components/EditAvatar/form/EditAvatar.jsx";
import Footer from "../Footer/Footer.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  onUpdateAvatar,
  cards,
  onCardLike,
  onCardDelete,
  onCardSubmit,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onCardSubmit={onCardSubmit} />,
  };
  const editProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    variant: "avatar",
    children: <EditAvatar onUpdateAvatar={onUpdateAvatar} />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser?.avatar || null}
            alt="Avatar with profile image"
          />
          <button
            type="button"
            className="profile__avatar-button"
            id="button-avatar"
            aria-label="Edit profile avatar"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              id="button-edit-profile"
              aria-label="Edit profile information"
              onClick={() => onOpenPopup(editProfilePopup)}
            >
              <img
                className="profile__edit-button-image"
                src={editButton}
                alt="Profile edit button"
              />
            </button>
          </div>
          <p className="profile__aboutme">{currentUser?.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          id="button-add-card"
          aria-label="Add new card"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            className="profile__add-button-image"
            src={addButton}
            alt="Button to add profile information"
          />
        </button>
      </section>

      <section className="elements" id="elements-container-cards">
        {(cards || []).map((card) => (
          <Card
            key={card._id}
            card={card}
            handleOpenPopup={onOpenPopup}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>

      <Footer />

      {popup && (
        <Popup
          onClose={onClosePopup}
          title={popup.title}
          variant={popup.variant}
          isOpen={Boolean(popup)}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
