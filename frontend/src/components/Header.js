import React from 'react';
import logo from '../images/logo.svg';
import { Route, Link, Switch } from 'react-router-dom'
function Header({ onEmail, setEmail }) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <Switch>
                <Route path="/signup">
                    <Link to="/signin" className="header__signin-link">Войти</Link>
                </Route>
                <Route path="/signin">
                    <Link to="/signup" className="header__signup-link">Зарегистрироваться</Link>
                </Route>
                <Route path="/">
                    <p className="header__email">{onEmail}</p>
                    <Link to="/signin" className="header__signout-link">Выход</Link>
                </Route>
            </Switch>
        </header>
    );
}
export default Header;
