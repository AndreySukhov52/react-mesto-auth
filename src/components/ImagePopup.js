import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {
    useEffect(() => {
        if (!card) return;
        function closePopupEscape(evt) {
            if (evt.key === "Escape") {
                onClose(evt);
            }
        };

        function closePopupOverlay(evt) {
            if (evt.target.classList.contains('popup_opened')) {
                onClose(evt);
            }
        };

        document.addEventListener('keydown', closePopupEscape);
        document.addEventListener('click', closePopupOverlay);

        return () => {
            document.removeEventListener('keydown', closePopupEscape);
            document.removeEventListener('click', closePopupOverlay);
        };
    }, [onClose, card]);

    return (
        <div className={`popup popup_photofull ${card ? 'popup_opened' : ''}`}>
            <figure className="popup__container-photofull">
                <button onClick={onClose} type="button" aria-label="закрыть"
                    className="popup__close popup__close_button_open-card">
                </button>
                <img className="popup__fullscreen" src={card && card.link} alt={card && card.name} />
                <h2 className="popup__title-mesto">{card && card.name}</h2>
            </figure>
        </div>
    );
};

export default ImagePopup;

