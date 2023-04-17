import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, name, link, likes, onCardClick, onCardLike, onConfirmCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  /** Определяем, являемся ли мы владельцем текущей карточки */
  const isOwn = card.owner._id === currentUser._id;

  /** В разметке используем переменную для условного рендеринга */
  const cardDeleteButtonClassName = `element__delete ${!isOwn && 'element__delete_invisible'
    }`;

  /** Определяем, есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  /** Создаём переменную, которую после зададим в `className` для кнопки лайка */
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_activ'}`;

  function handleCardClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleConfirmClick() {
    onConfirmCardDelete(card);
  };

  return (
    <figure className="element">
      <button onClick={handleConfirmClick} className={cardDeleteButtonClassName} type="button" aria-label="удалить"></button>
      <img onClick={handleCardClick} className="element__image" src={link} alt={name} />
      <figcaption className="element__caption">
        <h2 className="element__text">{name}</h2>
        <div className="element__container-like">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="лайк"></button>
          <p className="element__count-like">{likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;

