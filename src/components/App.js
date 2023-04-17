import React, { useState, useEffect } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import ConfirmationPopup from './ConfirmationPopup.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import InfoTooltip from './InfoTooltip.js';
import Login from './Login.js';
import Register from './Register.js';
import UnionBlack from '../images/UnionBlack.svg'
import UnionRed from '../images/UnionRed.svg'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [isEmail, setIsEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [popupStatus, setPopupStatus] = useState({ image: '', message: '' });

  const navigate = useNavigate();

  /** Регистрация пользователя */
  const handleRegister = (email, password) => {
    /** отправляем запрос на сервер для регистрации пользователя */
    auth.register(email, password)
      .then((res) => {
        /** сохраняем токен и email в localStorage */
        localStorage.setItem('jwt', res.jwt);
        localStorage.setItem('email', res.email);
        setPopupStatus({
          image: UnionBlack,
          message: 'Вы успешно зарегистрировались!'
        });
        navigate("/sign-in");
        /** обновляем стейт isLoggedIn и setIsEmail */
        setIsLoggedIn(true);
        setIsEmail(res.data.email);
      })
      .catch(() => {
        setPopupStatus({
          image: UnionRed,
          message: 'Что-то пошло не так! Попробуйте еще раз.'
        });
      })
      .finally(handleInfoTooltip);
  };

  /** Эффект при монтировании */
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, items]) => {
        setCurrentUser(data);
        setCards(items);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((error) => {
        console.error(error);
      });
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      }).catch((error) => {
        console.error(error);
      });
    };
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
    }).catch((error) => {
      console.error(error);
    });
  };

  function handleUpdateUser(items) {
    api
      .changeUserInfo(items)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  function handleUpdateAvatar(items) {
    api.changeUserAvatar(items).then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((error) => {
      console.error(error);
    });
  };

  function handleAddPlaceSubmit(items) {
    api
      .addCard(items)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error));
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={() => setIsEditProfilePopupOpen(true)}
          onAddPlace={() => setIsAddPlacePopupOpen(true)}
          onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike={handleCardLike}
          onConfirmCardDelete={(card) => setIsConfirmationPopupOpen(card)}
          cards={cards}
        />
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      >
      </AddPlacePopup>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}>
      </EditAvatarPopup>
      <ConfirmationPopup
        card={isConfirmationPopupOpen}
        name="popup_card-delete"
        title="Вы уверены?"
        textButton="Да"
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
      >
      </ConfirmationPopup>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
};

export default App;
