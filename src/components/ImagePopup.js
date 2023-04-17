function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_photofull ${card && 'popup_opened'}`}>
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

