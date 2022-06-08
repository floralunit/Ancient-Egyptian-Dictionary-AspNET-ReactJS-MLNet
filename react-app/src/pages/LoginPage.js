import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import "../components/LoginPage.css";
import {Col, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(username, password));
    };
    return (
        <div className={"loginpage"}>
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={submitHandler}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"/>
                            <input type="text" className="login__input" placeholder="Телефон или e-mail"
                                   value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"/>
                            <input type="password" className="login__input" placeholder="Пароль"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Войти</span>
                            <i className="button__icon fas fa-chevron-right"/>
                        </button>
                    </form>
                    <Row className="py-3">
                        <Col>
                            New Customer ? <NavLink to="/register">Register Here</NavLink>
                        </Col>
                    </Row>
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
