import React, { useState } from 'react';
import './MenuItem.css';

function MenuItem({ item }) {

  if (!item.visible) return null;

  return (
    <a href="/" className="menu-card">                              
        <img src={item.image} alt={item.name} />
        <div className='overlay'></div>
            
        <div className="content-txt">
            <h3>{ item.name }</h3>
            <p>{ item.ingredients }</p>            
        </div>
        <span className="menu-price">{ item.price } Birr</span>
    </a>
  );
}

export default MenuItem;
