import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './app/globals.css'; // هذا المسار سيصبح صحيحاً فوراً بمجرد نقل المجلد إلى src

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);