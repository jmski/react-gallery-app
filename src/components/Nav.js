import React from 'react';
import { NavLink, HashRouter, Link } from 'react-router-dom';

const Nav = (props) => (
            <HashRouter>
                <nav className="main-nav">
                    <ul>
                        <li><NavLink tag={Link} to="/taco" onClick={() => props.fetchData('taco')}>Taco</NavLink></li>
                        <li><NavLink tag={Link} to="/tattoo" onClick={() => props.fetchData('tattoo')}>Tattoo</NavLink></li>
                        <li><NavLink tag={Link} to="/toronto" onClick={() => props.fetchData('toronto')}>Toronto</NavLink></li>
                    </ul>
                </nav>
            </HashRouter>
        );

export default Nav;