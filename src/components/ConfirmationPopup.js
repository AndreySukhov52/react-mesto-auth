import PopupWithForm from "./PopupWithForm.js";

function ConfirmationPopup({ card, onClose, name, title, onCardDelete }) {

    function handleDeleteSubmit(evt) {
        evt.preventDefault();
        onCardDelete(card);
    };

    return (
        <PopupWithForm
            onClose={onClose}
            name={name}
            isOpen={!!card}
            onSubmit={handleDeleteSubmit}
            title={title}
            textButton="Да"
            isValid={true}
        />

    );
};
export default ConfirmationPopup;


