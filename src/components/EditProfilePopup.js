import React, { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormValidation } from '../utils/useFormValidation.js';

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {

    /** Подписка на контекст */
    const currentUser = useContext(CurrentUserContext);

    const { values, errors, isValid, handleChange, setValue, setIsValid } = useFormValidation();

    /** После загрузки текущего пользователя из API его данные будут использованы в управляемых компонентах. */
    useEffect(() => {
        if (currentUser) {
            setValue("userName", currentUser.name);
            setValue("userDescription", currentUser.about);
        }
        if (currentUser.name && currentUser.about) {
            setIsValid(true);
        }
    }, [currentUser, setValue, isOpen]);

    function handleSubmit(evt) {
        /** Запрещаем браузеру переходить по адресу формы */
        evt.preventDefault();

        /** Передаём значения управляемых компонентов во внешний обработчик */
        onUpdateUser({
            name: values['userName'],
            about: values['userDescription']
        });
    };

    const errorClassName = (name) => `popup__input-error ${errors[name] ? 'popup__input-error_visible' : ''}`

    const onClosePopup = () => {
        onClose();
    };

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClosePopup}
            onSubmit={handleSubmit}
            name="popup_profile"
            title="Редактировать&nbsp;профиль"
            textButton="Сохранить"
            isValid={isValid}>

            <input
                className="popup__input popup__input_item_name"
                id="inputName"
                type="text"
                placeholder="Имя"
                name='userName'
                value={values['userName'] ?? ''}
                onChange={handleChange}
                required
                minLength='2'
                maxLength='40'
            />
            <span className={errorClassName('userName')} id="inputName-error">{errors['userName']}</span>
            <input
                className="popup__input popup__input_item_job"
                id="inputAbout"
                name='userDescription'
                type="text"
                placeholder="О себе"
                value={values['userDescription'] ?? ''}
                onChange={handleChange}
                required
                minLength='2'
                maxLength='40'
            />
            <span className={errorClassName('userDescription')} id="inputAbout-error">{errors['userDescription']}</span>
        </PopupWithForm>
    )
};

export default EditProfilePopup;

