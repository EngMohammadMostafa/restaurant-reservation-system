    // src/components/BookingForm.tsx
    import React, { useState } from 'react';
    import { apiServices } from '../api/services';

    export const BookingForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        guests: 1
    });
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const hours = Array.from({ length: 11 }, (_, i) => `${i + 13}:00`);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        setError(null);
        setLoading(true);

        try {
        await apiServices.createReservation({
            name: formData.name,
            email: formData.email,
            date: formData.date,
            time: formData.time,
            guests: Number(formData.guests)
        });
        setMessage('تم استلام طلبك، يرجى تفقّد إيميلك عند موافقة الإدارة');
        setFormData({ name: '', email: '', date: '', time: '', guests: 1 });
        } catch (err: any) {
        setError(err.message || 'حدث خطأ أثناء الحجز');
        } finally {
        setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '20px', color: '#333' }}>
        <h2>📅 حجز طاولة</h2>
        {message && <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px', padding: '10px', backgroundColor: '#e6ffe6', borderRadius: '5px' }}>{message}</div>}
        {error && <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '5px' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="الاسم الكريم" required style={{ padding: '10px' }} />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="البريد الإلكتروني" required style={{ padding: '10px' }} />
            <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ padding: '10px' }} />
            
            <select name="time" value={formData.time} onChange={handleChange} required style={{ padding: '10px' }}>
            <option value="" disabled>اختر الوقت (ساعات حصراً)</option>
            {hours.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
            
            <input type="number" name="guests" min="1" max="20" value={formData.guests} onChange={handleChange} placeholder="عدد الزوار" required style={{ padding: '10px' }} />
            
            <button type="submit" disabled={loading} style={{ padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
            {loading ? 'جاري الإرسال...' : 'تأكيد الحجز'}
            </button>
        </form>
        </div>
    );
    };  