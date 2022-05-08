
import React, { useState } from "react";
import { NavLink} from "react-router-dom";
import "./Navbar.css";
import { navItems } from "./NavItems";
import Button from "./Button";
import Dropdown from "./Dropdown";


export function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <nav className="navbar">
                <div  className="navbar-logo">
                    <img src='https://cdn-icons-png.flaticon.com/512/2166/2166288.png' width={32} height={32}/>
                    Древнеегипетский справочник
                </div>
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
                </ul>
                <Button />
            </nav>
        </>
    );
}
export default Navbar;
