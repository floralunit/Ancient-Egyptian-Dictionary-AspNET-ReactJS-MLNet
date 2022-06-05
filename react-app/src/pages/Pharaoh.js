import React from 'react'
import {NavLink} from "react-router-dom";
import Dropdown from "../components/Dropdown";

export function Pharaoh() {
    return (
        <div className="pharaohs">
            <div className={"empty"}/>
            <div style={{background: '#FBEEC1', borderRadius: '10px', padding: '2vh', margin: 'auto 30vh'}}>
                <h2 align={"center"} className={"black"}>Списки фараонов</h2>
                <hr/>
                <div style={{fontSize: '3vh'}}>
                    <ul style={{listStyleType: 'none', textAlign: 'center'}}>
                        <li style={{margin: '2vh auto'}}>
                            <NavLink to="./abydoscanon">Абидосский список</NavLink>
                        </li>
                        <li style={{margin: '2vh auto'}}>
                            <NavLink to="./saqqaracanon">Саккарский список</NavLink>
                        </li>
                    </ul>
                </div>
                <img src={('https://cdn-icons-png.flaticon.com/512/5776/5776687.png')} style={{margin:'1vh auto', display: 'block'}} height={"75vh"}/>
            </div>
        </div>
    );
}
