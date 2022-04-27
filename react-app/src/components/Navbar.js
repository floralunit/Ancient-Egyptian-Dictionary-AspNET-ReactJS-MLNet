
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { navItems } from "./NavItems";
import Button from "./Button";
import Dropdown from "./Dropdown";


export function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <nav className="navbar">
                <Link to="/about" className="navbar-logo">
                    <img src='https://cdn-icons-png.flaticon.com/512/2166/2166288.png' width={32} height={32}/>
                    Древнеегипетский справочник
                </Link>
                <ul className="nav-items">
                    {navItems.map((item) => {
                        if (item.title === "Фараоны1") {
                            return (
                                <li
                                    key={item.id}
                                    className={item.cName}
                                    onMouseEnter={() => setDropdown(true)}
                                    onMouseLeave={() => setDropdown(false)}
                                >
                                    <Link to={item.path}>{item.title}</Link>
                                    {dropdown && <Dropdown />}
                                </li>
                            );
                        }
                        return (
                            <li key={item.id} className={item.cName}>
                                <Link to={item.path}>{item.title}</Link>
                            </li>
                        );
                    })}
                </ul>
                <Button />
            </nav>
        </>
    );
}
export default Navbar;
