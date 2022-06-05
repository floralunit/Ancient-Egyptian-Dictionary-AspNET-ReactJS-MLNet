import React from 'react'
import "../components/LoginPage.css";

export function LoginPage() {
    return (
        <div className={"loginpage"}>
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"/>
                            <input type="text" className="login__input" placeholder="Телефон или e-mail"/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"/>
                            <input type="password" className="login__input" placeholder="Пароль"/>
                        </div>
                        <button className="button login__submit">
                            <span className="button__text">Войти</span>
                            <i className="button__icon fas fa-chevron-right"/>
                        </button>
                    </form>
                    {/*<div className="social-login">*/}
                    {/*    <h3>log in via</h3>*/}
                    {/*    <div className="social-icons">*/}
                    {/*        <a href="#" className="social-login__icon fab fa-instagram"/>*/}
                    {/*        <a href="#" className="social-login__icon fab fa-facebook"/>*/}
                    {/*        <a href="#" className="social-login__icon fab fa-twitter"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"/>
                    <span className="screen__background__shape screen__background__shape3"/>
                    <span className="screen__background__shape screen__background__shape2"/>
                    <span className="screen__background__shape screen__background__shape1"/>
                </div>
            </div>
        </div>
        </div>
    );
}
