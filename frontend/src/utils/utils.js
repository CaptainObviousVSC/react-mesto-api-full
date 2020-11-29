
  export const config = ({
     inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
   });
   export const popupAdd = document.querySelector('.popup_add');
   export const popupOpenButtonEdite = document.querySelector('.profile__edit');
   export const popupOpenButtonAdd = document.querySelector('.profile__add')
   export const titleInput = popupAdd.querySelector('.popup__input_value-place');
   export const linkInput = popupAdd.querySelector('.popup__input_value-link');
   export const openAvatar = document.querySelector('.profile__avatar');
   export const submitButtonEdite = document.querySelector('.popup__save_edite');
   export const submitButtonAvatar = document.querySelector('.popup__save_avatar');
   export const submitButtonAdd = document.querySelector('.popup__save_add');
   export const formAvatar = document.querySelector('.popup__form_avatar')
   export const form = document.querySelector('.popup__form');
   export const formAdd = document.querySelector('.popup__form_add');
   export const myForm = document.querySelector('.popup__form')
   export const nameInput = form.elements.name;
   export const aboutInput = form.elements.about;
