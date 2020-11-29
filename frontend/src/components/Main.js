import React from 'react';
import Card from './Card'
import api from '../utils/api'
import CurrentUserContext from '../contexts/CurrentUserContext'
function Main({ onCardClick, cardsMap, onEditAvatar, onEditProfile, onAddPlace, onCardDelete, onCardLike, onCardDislike }) {
    const currentUser = React.useContext(CurrentUserContext);
    return (
        <main>
            <section className="profile">
                <div className="profile__box">
                    <button className="profile__avatar" onClick={onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></button>
                    <div className="profile__info">
                        <button className="profile__edit" onClick={onEditProfile}></button>
                        <div className="profile__container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <p className="profile__description">{currentUser.about}</p>
                        </div>
                    </div>
                </div>
                <button className="profile__add" onClick={onAddPlace}></button>
            </section>
            <ul className="elements">
                {cardsMap.map((card) => <Card key={card._id} card={card} onCardClick={onCardClick} currentUser={currentUser} onCardDelete={onCardDelete} onCardLike={onCardLike} onCardDislike={onCardDislike} />)}
            </ul>
        </main>
    );
}
export default Main;