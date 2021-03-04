import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/search/cars">Cars</NavLink></li>
            <li><NavLink to="/search/dogs">Dogs</NavLink></li>
            <li><NavLink to="/search/toronto">Toronto</NavLink></li>
        </ul>
    </nav>
);

export default Nav;