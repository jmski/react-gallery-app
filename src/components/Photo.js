import React from 'react';

const Photo = props => (
    <li className='photo-container'>
        <img src={props.url} alt=""/>
    </li>
);

export default Photo;