function ConfirmationPopup({ card, onClose, name, title, onCardDelete }) {

    function handleDeleteClick() {
        onCardDelete(card);
        onClose();
    }

    return (
        <div className={`popup popup_${name} ${card && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__close" type="button" aria-label="закрыть"></button>
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form popup__form_type_card-delete">
                    <button onClick={handleDeleteClick} className="popup__button" type="submit">Да</button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
