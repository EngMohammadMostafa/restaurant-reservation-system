// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/admin/Login';
import { Dashboard } from './pages/admin/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* الواجهة العامة للزبائن */}
        <Route path="/" element={<Home />} />
        
        {/* واجهات الإدارة والأدمن */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;