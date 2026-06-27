// src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { MenuList } from '../components/MenuList';
import { BookingForm } from '../components/BookingForm';
import { apiServices } from '../api/services';
import type{ Dish } from '../types';

export const Home: React.FC = () => {
  const [menu, setMenu] = useState<Dish[]>([]);

  // جلب بيانات المنيو من الباك آيند عند تحميل الصفحة
  useEffect(() => {
    apiServices.getMenu()
      .then(data => setMenu(data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', direction: 'rtl' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🍽️ مطعمنا الاحترافي</h1>
        <p style={{ color: '#666' }}>أهلاً بك! يمكنك تصفح المنيو وحجز طاولتك مباشرة.</p>
      </header>
      
      <MenuList menu={menu} />
      <BookingForm />
    </div>
  );
};