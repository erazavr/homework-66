import React from 'react';
import './Toolbar.css'
import NavigationItems from "../NavigationItems/NavigationItems";
const Toolbar = () => (
    <header className='header'>
        <h2>Static Pages</h2>
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;