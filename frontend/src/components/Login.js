import React from 'react'
import { withRouter } from 'react-router-dom';
import '../styles/Login.css';
function Login ({setOnLogin}) {
  const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
   // console.log((e) => {setUsername(e.target.value)})
   function handleSubmit(e) {
    e.preventDefault();
        if (!email || !password){
          console.log('dfsdfsd')
          return;
        }
        setOnLogin(email, password)
   }
    return(
      <div className="login">
        <p className="login__welcome">
            Вход
        </p>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__label" htmlFor="username">
            Логин:
          </label>
          <input className="login__input" required id="username" name="username" type="text" value={email} onChange={(e) => {setEmail(e.target.value)}} />
          <label className="login__label" htmlFor="password">
            Пароль:
          </label>
          <input className="login__input" required id="password" name="password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            <button type="submit" className="login__button">Войти</button>
        </form>
      </div>
    )

}

export default withRouter(Login);
