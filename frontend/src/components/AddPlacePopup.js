import React from 'react'
import PopupWithForm from './PopupWithForm'
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputPlace = React.useRef('')
  const inputLink = React.useRef('')
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: inputPlace.current.value,
      link: inputLink.current.value
    })
    e.target.reset()
  }
  return (
    <PopupWithForm name="popup_add" isOpen={isOpen} title="Новое Место" onClose={onClose} onSubmit={handleSubmit} >
      <input type="text" name="place" ref={inputPlace} className="popup__input popup__input_value-place" placeholder="Название"
        required minLength="1" maxLength="30" />
      <span className="popup__error" id="place-error"></span>
      <input type="url" name="link" ref={inputLink} className="popup__input popup__input_value-link"
        placeholder="Ссылка на картинку" required />
      <span className="popup__error" id="link-error"></span>
    </ PopupWithForm>
  )
}

export default AddPlacePopup