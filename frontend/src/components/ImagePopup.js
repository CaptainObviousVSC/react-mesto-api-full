import React from 'react'
function ImagePopup({onClose, card, name, link, isOpen}) {
    return (
    <section className={isOpen ? `popup popup_photo popup_opened` : `popup popup_photo`}>
    <div className="popup__box">
    <button className="popup__close" onClick={onClose}></button>
    <p className="popup__box-title">{name}</p>
        <img className="popup__img" src={link} 
            alt={name} />
    </div>
</section>
    )
}
export default ImagePopup