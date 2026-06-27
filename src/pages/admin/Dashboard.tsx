// src/pages/admin/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiServices } from '../../api/services';
import type { Reservation, Dish } from '../../types';

export const Dashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menu, setMenu] = useState<Dish[]>([]);
  const [newDish, setNewDish] = useState({ dishName: '', price: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin_token')) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setError(null);
      const resData = await apiServices.getReservations();
      const menuData = await apiServices.getMenu();
      setReservations(Array.isArray(resData) ? resData : []);
      setMenu(Array.isArray(menuData) ? menuData : []);
    } catch (err: any) {
      setError(err.message || 'فشل في تحميل البيانات الصادرة من السيرفر');
    }
  };

  // --- دوال التحديث الفوري (Optimistic Updates) ---

  const handleStatusChange = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    // 1. تحديث الواجهة فوراً قبل حتى أن يرد السيرفر (لسرعة الاستجابة)
    setReservations(prev => prev.map(res => res.id === id ? { ...res, status } : res));

    // 2. إرسال الطلب للسيرفر في الخلفية
    try {
      await apiServices.updateReservationStatus(id, status);
    } catch (err: any) {
      alert(err.message);
      loadData(); // إذا فشل السيرفر لسبب ما، نتراجع عن التحديث بالواجهة
    }
  };

  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedDish = await apiServices.addDish({ dishName: newDish.dishName, price: Number(newDish.price) });
      // وضع الطبق الجديد فوراً في أول المنيو على الشاشة
      setMenu(prev => [addedDish, ...prev]);
      setNewDish({ dishName: '', price: '' });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleUpdatePrice = async (id: string, currentPrice: number) => {
    const newPrice = prompt("أدخل السعر الجديد للطبق:", currentPrice.toString());
    if (!newPrice || isNaN(Number(newPrice))) return;

    const updatedPrice = Number(newPrice);
    
    // تحديث السعر على الشاشة دغري
    setMenu(prev => prev.map(dish => dish.id === id ? { ...dish, price: updatedPrice } : dish));

    try {
      await apiServices.updateDishPrice(id, updatedPrice);
    } catch (err: any) {
      alert(err.message);
      loadData(); // التراجع إذا حدث خطأ
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin/login');
  };

  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'sans-serif', color: '#fff', backgroundColor: '#16171d', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
        <h2>💼 لوحة تحكم الإدارة</h2>
        <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', padding: '5px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>تسجيل الخروج</button>
      </div>

      {error && <div style={{ color: 'red', margin: '15px 0', fontWeight: 'bold' }}>⚠️ {error}</div>}

      {/* جدول الحجوزات */}
      <section style={{ marginTop: '30px' }}>
        <h3>📅 جدول الحجوزات القادمة</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', color: '#333', backgroundColor: '#fff' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'right' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الاسم</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الإيميل</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>التاريخ والوقت</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الزوار</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>الحالة</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {reservations.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '10px', textAlign: 'center' }}>لا توجد حجوزات مسجلة حالياً.</td></tr>
            ) : (
              reservations.map((res) => (
                <tr key={res.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{res.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{res.email}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{res.date} الساعة {res.time}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{res.guests}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', color: res.status === 'confirmed' ? 'green' : res.status === 'cancelled' ? 'red' : 'orange' }}>{res.status.toUpperCase()}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', gap: '5px', display: 'flex' }}>
                    {res.status === 'pending' && (
                      <>
                        <button onClick={() => handleStatusChange(res.id, 'confirmed')} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>موافقة</button>
                        <button onClick={() => handleStatusChange(res.id, 'cancelled')} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}>إلغاء (رفض)</button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* إدارة المنيو */}
      <section style={{ marginTop: '50px', borderTop: '1px solid #ccc', paddingTop: '20px' }}>
        <h3>📝 إدارة قائمة الطعام (المنيو)</h3>
        <form onSubmit={handleAddDish} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input type="text" placeholder="اسم الطبق" value={newDish.dishName} onChange={(e) => setNewDish({ ...newDish, dishName: e.target.value })} required style={{ padding: '8px', color: '#333' }} />
          <input type="number" placeholder="السعر" value={newDish.price} onChange={(e) => setNewDish({ ...newDish, price: e.target.value })} required style={{ padding: '8px', color: '#333' }} />
          <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>إضافة طبق</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menu.map((dish) => (
            <li key={dish.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', maxWidth: '500px' }}>
              <span>{dish.dishName} - {dish.price} ل.س</span>
              <button onClick={() => handleUpdatePrice(dish.id, dish.price)} style={{ backgroundColor: '#ffc107', color: '#000', border: 'none', padding: '3px 8px', borderRadius: '3px', cursor: 'pointer' }}>تعديل السعر</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};