import React from 'react'
import '../styles/InfoTooltip.css'
import X from '../images/X.svg'
import checkMark from '../images/check-mark.svg'
function InfoTooltip({ onClose, isOpen, status }) {
    return (
        <>
            <section className={isOpen ? `info-popup info-popup_opened` : `info-popup`}>
                <div className="info-popup__container">
                    {status === 'success' ?
                        <div>
                             <img className="info-popup__img" src={checkMark} alt="" />
                            <h2 className="info-popup__title">Вы успешно зарегистрировались!</h2>
                        </div>
                        :
                        <div>
                            <img src={X} className="info-popup__img" alt="" />
                            <h2 className="info-popup__title">Что-то пошло не так!<br />Попробуйте ещё раз</h2>
                        </div>
                    }
                    <button className="info-popup__close" onClick={onClose}></button>
                </div>
            </section>
        </>
    )
}
export default InfoTooltip