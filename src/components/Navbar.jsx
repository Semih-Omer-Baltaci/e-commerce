/* eslint-disable no-unused-vars */
import React from 'react';
import navbarImage from '../assets/navbar-style-1 navbar-light.jpg';



function Navbar() {
    return (
        <nav className="navbar">
            <div className="pl-10 gap-5 flex flex-col items-center">
                <img src={navbarImage} alt="Navbar" />
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/hakkimizda">Product</a></li>
                <li><a href="/hakkimizda">Pricing</a></li>
                <li><a href="/iletisim">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;