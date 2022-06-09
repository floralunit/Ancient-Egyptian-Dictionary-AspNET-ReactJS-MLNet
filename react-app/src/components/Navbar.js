
import React, { useState,useEffect } from "react";
import {Link, NavLink} from "react-router-dom";
import "./Navbar.css";
import { navItems } from "./NavItems";
import Dropdown from "./Dropdown";
import {logout} from "../actions/userActions";
import "./Button.css";
import {NavDropdown} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


export function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout());
    };

    useEffect(() => {}, [userInfo]);

    return (
        <>
            <nav className="navbar">
                <div  className="navbar-logo">
                    <img src='https://cdn-icons-png.flaticon.com/512/2166/2166288.png' width={32} height={32} style={{margin: '0 1vh'}}/>
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
                    {userInfo ? (
                        <>
                            <NavDropdown
                                title={`${userInfo.username}`}

                                active={{color: 'white'}}
                            >
                                <NavDropdown.Item href="/profile" >
                                    {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
                                    Профиль
                                </NavDropdown.Item>

                                {/*<NavDropdown.Divider />*/}
                                <NavDropdown.Item onClick={logoutHandler} >
                                    Выйти
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) :
                        (
                            <li className={"btn"}>
                                <NavLink to="/signin">Войти</NavLink>
                            </li>
                        )}
                </ul>
            </nav>
        </>
    );
}
export default Navbar;
