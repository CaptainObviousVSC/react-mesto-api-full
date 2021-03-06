import React from 'react';
import '../index.css';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import Footer from './Footer'
import CurrentUserContext from '../contexts/CurrentUserContext'
import api from '../utils/api';
import EditProfilePopup from './EditeProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import EditAvatarPopup from './EditeAvatarPopup'
import Register from './Register'
import Login from './Login'
import ProtectedRoute from './ProtectedRoute'
import auth from '../utils/auth'
import InfoTooltip from './InfoTooltip'
function App() {
  const history = useHistory()
  const [isProfilePopupOpen, setIsProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false)
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false)
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])
  const [status, setStatus] = React.useState({})
  // const [token, setToken] = React.useState({})
   function onLogin(email, password) {
    auth.getLogin(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token)
        setIsLoggedIn(true)
         setEmail(email)
        history.push('/')
      }).catch(err => {
        console.log(err.status) 
        if(err.status === 400) {
          setIsLoggedIn(false)
         return console.log('не передано одно из полей')
      }
        else if(err.status === 401) {
          setIsLoggedIn(false)
       return console.log('пользователь с email не найден')
      }
      return console.log('error 500')
    })
  }
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt).then((data) => {
        if(data) {
            setEmail(data.email)
          setIsLoggedIn(true)
          history.push('/')
        }
      }).catch(err => {
        console.log(err.status) 
        if(err.status === 401) {
         return console.log('Переданный токен некорректен ')
      }
        else if(!jwt) {
       return console.log('Токен не передан или передан не в том формате')
      }
      return console.log('error 500')
    })
    }
  }
  React.useEffect(() => {
      handleTokenCheck()
    }, [])
      React.useEffect(() => {
    if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
      api.getCards(jwt).then((data) => {
        setCards(data)
      })
      api.getInformation(jwt).then((data) => {
        console.log(data)
        setCurrentUser(data)
      })
       }
    return
    }, [isLoggedIn])
  function handleConfirmDeleteClick() {
    setIsConfirmPopupOpen(true)
  }
  function handleAddPlaceClick(item) {
     if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
      api.createCard(item, jwt).then((item) => {
        console.log(item)
      setCards([item, ...cards])
      setIsAddPopupOpen(false)
       }).catch(err => console.error(err))
    }
  }
  function handleInfoTooltip() {
    console.log('hi')
    setIsInfoTooltip(true)
  }
  function onRegister(email, password) {
    auth.getRegister(password, email).then(() => {
      setStatus('success')
      handleInfoTooltip()
      history.push('/signin');
    }).catch((err) => {
    if(err.status === 400) {
      setStatus('unsuccess')
      handleInfoTooltip()
      return console.log('не передано одно из полей')
    }
    return console.log('error 500')
    });
  }
  function onSignOut() {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    history.push('/signin')
  }
   function handleCardLike(cardId) {
     if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
         api.likeCard(cardId, jwt).then((newCard) => {
      const newCards = cards.map((item) => item._id === cardId ? newCard : item)
      setCards(newCards);
    }).catch(err => console.error(err))
    }
  }
  function handleCardDislike(cardId) {
       if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
       api.dislikeCard(cardId, jwt).then((newCard) => {
      const newCards = cards.map((item) => item._id === cardId ? newCard : item)
      setCards(newCards);
    }).catch(err => console.error(err))
    }
  }
  function handleCardDelete(cardId) {
     if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
        api.deleteCard(cardId, jwt).then(() => {
          console.log(cards)
      const newCards = cards.filter((item) => item._id !== cardId)
      setCards(newCards);
    }).catch(err => console.error(err))
  }
  }
  function handleUpdateUser(item) {
     if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
       console.log(jwt)
       api.editInformation(item, jwt).then((item) => {
      setCurrentUser({ ...currentUser, name: item.data.name, about: item.data.about })
      setIsProfilePopupOpen(false)
    }).catch(err => console.error(err))
       }
  }
  function handleUpdateAvatar(item) {
       if(isLoggedIn) {
       const jwt = localStorage.getItem('jwt')
       api.editAvatar(item, jwt).then((item) => {
         console.log(item)
     setCurrentUser({ ...currentUser, avatar: item.data.avatar })
      setIsAvatarPopupOpen(false)
    }).catch(err => console.error(err))
       }
  }
  function closePopups() {
    setIsAvatarPopupOpen(false)
    setIsProfilePopupOpen(false)
    setIsAddPopupOpen(false)
    setIsConfirmPopupOpen(false)
    setIsInfoTooltip(false)
    setSelectedCard({})
  }
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true)
  }
  function handleAddCardClick() {
    setIsAddPopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  return (
    <CurrentUserContext.Provider value={currentUser} >
      <div className="page">
          <Header setOnSIgnOut={onSignOut} onEmail={email} />
          <Switch>
            <ProtectedRoute
              exact path="/"
              loggedIn={isLoggedIn}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddCardClick}
              onConfirmDelete={handleConfirmDeleteClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              onCardDislike={handleCardDislike}
              cardsMap={cards}
              editProfileisOpen={isProfilePopupOpen}
              addCardisOpen={isAddPlacePopupOpen}
              editAvatarIsOpen={isEditAvatarPopupOpen}
              confirmDeleteIsOpen={isConfirmPopupOpen}
              component={Main}
            />
            <Route path="/signin">
              <Login setOnLogin={onLogin} />
            </Route>
            <Route path="/signup">
              <Register setOnRegister={onRegister} />
            </Route>
          </Switch>
          <Route path='/' exact >
           <Footer/>
          </Route>
          <InfoTooltip status={status} isOpen={isInfoTooltip} onClose={closePopups} />
        <ImagePopup onClose={closePopups} isOpen={selectedCard.link} link={selectedCard.link} name={selectedCard.name} />
        <EditProfilePopup
          isOpen={isProfilePopupOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closePopups}
          onAddPlace={handleAddPlaceClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm name="popup_confirm" isOpen={isConfirmPopupOpen} title="Вы уверены?"
          children={
            <>
            </>
          }
          onClose={closePopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
