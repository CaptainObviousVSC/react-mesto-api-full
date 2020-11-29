import React from 'react'
function Card({ card, onCardClick, onCardDelete, onCardLike, currentUser, onCardDislike }) {
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButton = (
    `card__delete-button ${isOwn ? 'element__remove' : ''}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButton = `${isLiked ? 'element__like element__like_active' : 'element__like'}`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeCard() {
    onCardLike(card._id)
  }
  function handleDislikeCard() {
    onCardDislike(card._id)
  }
  function handleDeleteCard() {
    onCardDelete(card._id)
  }
  return (
    <li className="element">
      <button className={`${cardDeleteButton}`} onClick={handleDeleteCard}></button>
      <img className="element__img" src={card && card.link} alt={card && card.name} onClick={handleClick} />
      <div className="element__textbox">
        <h2 className="element__title">{card && card.name}</h2>
        <div className="element__likes">
          <button type="button" className={`${cardLikeButton}`} onClick={() => { if (isLiked) { handleDislikeCard() } else { handleLikeCard() } }}></button>
          <p className="element__counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  )
}
export default Card