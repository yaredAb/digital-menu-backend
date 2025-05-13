import React, { useState } from 'react';
import './MenuItem.css';

function MenuItem({ item }) {
  const [expanded, setExpanded] = useState(false);

  if (!item.visible) return null;

  return (
    <a href="#" class="menu-card" data-category="{{ $item->category }}">                       

        <div className='content'>
            <div className='content-img'>
                <img src={item.image} alt={item.name} />
            </div>
            <div class="content-txt">
                <h3>{ item.name }</h3>
                <p>{ item.ingredients }</p>
            </div>
        </div>
        <span class="menu-price">{ item.price } Birr</span>
    </a>
  );
}

export default MenuItem;
