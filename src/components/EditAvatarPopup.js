import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props){
    const ref = useRef('');
  
    function handleSubmit(evt) {
      evt.preventDefault();
  /** Значение инпута, полученное с помощью рефа */
      props.onUpdateAvatar({
        avatar: ref.current.value
      });
    };
  
    useEffect(() => {
      ref.current.value = '';
    }, [props.isOpen]);
  
    return(
      <PopupWithForm
        isOpen = {props.isOpen}
        onClose = {props.onClose}
        onSubmit = {handleSubmit}
        name="popup_avatar"
        title="Обновить аватар"
        textButton="Сохранить">

        <input
          className="popup__input popup__input_link-avatar"
          id="inputAvatarName"
          type="url"
          placeholder="Ссылка на аватар"
          required
          ref={ref}
        />
        <span className="inputAvatarName-error popup__input-error" id="inputAvatarName-error"></span>
        </PopupWithForm>
    );
  };
  
  export default EditAvatarPopup;
  