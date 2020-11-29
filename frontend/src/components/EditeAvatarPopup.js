import React from 'react'
import PopupWithForm from './PopupWithForm'
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputAvatar = React.useRef('')
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatar.current.value
        })
        e.target.reset()
    }
    return (
        <PopupWithForm name="popup_avatar" isOpen={isOpen} title="Обновить аватар" onClose={onClose} onSubmit={handleSubmit} >
            <input type="url" name="avatar" ref={inputAvatar} className="popup__input popup__input_value-avatar"
                placeholder="Ссылка на аватар" required />
            <span className="popup__error" id="avatar-error"></span>
        </ PopupWithForm>
    )
}

export default EditAvatarPopup