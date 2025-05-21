import React, { useState } from 'react';
import './MenuItem.css';

function MenuItem({ item }) {

  if (!item.visible) return null;

  return (
    <a href="/" className="shadow-lg overflow-hidden rounded-lg border border-gray-500 h-68">                              
        <img src={item.image} alt={item.name} className='h-44 w-full object-cover bg-slate-200' />
            
        <div className="p-2">
            <p className='text-xl font-medium'>{ item.name }</p>
            <p className='text-lg font-medium'>{ item.price } Birr</p>            
        </div>
    </a>
  );
}

export default MenuItem;
