// src/components/MenuList.tsx
import React from 'react';
import type { Dish } from '../types';

interface Props {
  menu: Dish[];
}

export const MenuList: React.FC<Props> = ({ menu }) => {
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>📜 قائمة الطعام والأسعار</h2>
      {!Array.isArray(menu) || menu.length === 0 ? (
        <p>لا توجد أطباق متاحة حالياً أو هناك مشكلة في جلب البيانات.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menu.map((dish) => (
            <li key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #ccc' }}>
              <span>{dish.dishName}</span> {/* تم تعديلها هنا إلى dishName */}
              <strong>{dish.price} ل.س</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};