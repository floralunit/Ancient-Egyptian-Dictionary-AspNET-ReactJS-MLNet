
import React, { useState,useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import "../styles/Navbar.css";
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";
import {logout} from "../actions/auth";
import "../styles/Button.css";
import {NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


export function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();


    const { user: currentUser } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
    };


    return (
        <>
            <nav className="navbar">
                <div  className="navbar-logo">
                    <img src='https://cdn-icons-png.flaticon.com/512/2166/2166288.png'/>
                    Древнеегипетский справочник
                </div>
                <ul className="nav-items">
                    {navItems.map((item) => {
                        if (item.title === "Фараоны ▾") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}
                                >
                                    <NavLink to={item.path}>{item.title}</NavLink>
                                    {dropdown && <Dropdown />}
                                </li>
                            );
                        }

                        return (
                            <li key={item.id} className={item.cName}>
                                <NavLink to={item.path}>{item.title}</NavLink>
                            </li>
                        );
                    })}
                    {currentUser ? (
                        <>
                            <NavDropdown
                                title={`${currentUser.username}`}

                                active={{color: 'white'}}
                            >
                                <NavDropdown.Item href="profile" >
                                    {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                                    Профиль
                                </NavDropdown.Item>
                                <NavDropdown.Item href="questions" >
                                    Обсуждения
                                </NavDropdown.Item>

                                {/*<NavDropdown.Divider />*/}
                                <NavDropdown.Item onClick={logoutHandler} href="signin">
                                    Выйти
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) :
                        (
                            <li className={"btn"}>
                                <NavLink to="signin">Войти</NavLink>
                            </li>
                        )}
                </ul>
            </nav>
        </>
    );
}
export default Navbar;
