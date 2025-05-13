import React, { useState } from 'react';
import './MenuItem.css';

function MenuItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.visible) return null;

  return (
    <a href="/" className="menu-card">                       

        <div className='content'>
            <div className='content-img'>
                <img src={item.image} alt={item.name} />
            </div>
            <div className="content-txt">
                <h3>{ item.name }</h3>
                <p>{ item.ingredients }</p>
            </div>
        </div>
        <span className="menu-price">{ item.price } Birr</span>
    </a>
  );
}

export default MenuItem;
