import React from "react";
import "./navbar.css"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate(); 

    const nav = () =>{
        navigate("/Home")
    }

    return (
        <div className="container-navbar">
            <div className="navbar">
                <div className="Logo" onClick={nav} >Quiver</div>
                <div className="menus">
                    <ul>
                        <li><a href="/Home">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="/Contact">Contact</a></li>
                        <li><a href="/">Logout</a></li>

                    </ul>
                </div>
            </div>
        </div>
    );

};

export default Navbar;