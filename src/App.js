import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage';
import AdminPage from './pages/AdminPage';
import './App.css';
import QRCodePage from './pages/QRCodePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MenuPage />} />
        <Route path='/qr' element={<QRCodePage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
