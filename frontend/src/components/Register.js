import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import '../styles/Register.css';
function Register ({setOnRegister}) {
  const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
   function handleSubmit(e) {
    e.preventDefault();
        setOnRegister(email, password)
   }
   return (
          <div className="register">
            <p className="register__welcome">
                Регистрация
            </p>
            <form onSubmit={handleSubmit} className="register__form">
              <label className="register__label" htmlFor="email">
                Email:
              </label>
              <input className="register__input" id="email" name="email" type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
              <label className="register__label" htmlFor="password">
                Пароль:
              </label>
              <input className="register__input" id="password" name="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
              <div className="register__button-container">
                <button type="submit" onSubmit={handleSubmit} className="register__button">Зарегистрироваться</button>
              </div>
            </form>
            <div className="register__signin">
              <p className="register__signin-question">Уже зарегистрированы?</p>
              <Link to="/signin" className="register__login-link">Войти</Link>
            </div>
            </div>
      );

}
export default withRouter(Register)