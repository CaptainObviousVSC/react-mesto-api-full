import React from 'react'
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext'
function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [about, setAbout] = React.useState('')
    React.useEffect(() => {
        setName(currentUser.name)
        setAbout(currentUser.about)
    }, [currentUser])
    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({
            name: name,
            about: about
        })
    }
    return (
        <PopupWithForm name="popup_edit" isOpen={isOpen} title="Редактировать профиль" onClose={onClose} onSubmit={handleSubmit}>
            <input type="text" name="name" value={name} className="popup__input popup__input_value-name"
                placeholder="Имя Фамилия" required minLength="2" maxLength="40" onChange={e => setName(e.target.value)} />
            <span className="popup__error" id="name-error"></span>
            <input type="text" name="about" value={about} className="popup__input popup__input_value-description"
                placeholder="Описание" required minLength="2" maxLength="200" onChange={e => setAbout(e.target.value)} />
            <span className="popup__error" id="about-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup