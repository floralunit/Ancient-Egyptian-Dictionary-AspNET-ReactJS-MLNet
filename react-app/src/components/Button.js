import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export function Button() {
    return (
        <Link to="signup">
            <button className="btn">Вход</button>
        </Link>
    );
}

export default Button;