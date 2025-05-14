import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuItem from './components/MenuItem';
import './App.css';
import AddMenuItem from './components/AddMenuItem';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
