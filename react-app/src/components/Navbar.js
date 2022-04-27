
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { navItems } from "./NavItems";

export function Navbar() {
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="navbar-logo">
                    <img src='https://cdn-icons-png.flaticon.com/512/1499/1499032.png' width={50} height={50}/>
                </Link>
                <ul className="nav-items">
                    {navItems.map((item) => {

                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
export default Navbar;
