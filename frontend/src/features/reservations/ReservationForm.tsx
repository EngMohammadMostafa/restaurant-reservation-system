import React, { useState } from 'react';
import { apiClient } from '../../shared/api/apiClient';

export const ReservationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    numberOfGuests: 1,
    customerEmail: ''
  });
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      // إرسال البيانات للباك إند التابع لنا (المنفذ 3000)
      await apiClient.post('/reservations', {
        ...formData,
        numberOfGuests: Number(formData.numberOfGuests)
      });
      
      setStatusMessage({
        type: 'success',
        text: '🎉 Done! Your reservation request has been sent. Please check your console/email for confirmation.'
      });
      
      // تفريغ الفورم بعد النجاح
      setFormData({ name: '', date: '', time: '', numberOfGuests: 1, customerEmail: '' });
    } catch (error) {
      setStatusMessage({
        type: 'error',
        text: '❌ Something went wrong. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book a Table</h2>
      
      {statusMessage && (
        <div className={`p-4 rounded-lg mb-4 text-sm font-medium ${
          statusMessage.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            value={formData.customerEmail}
            onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Time</label>
            <input
              type="time"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              value={formData.time}
              onChange={e => setFormData({ ...formData, time: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Guests</label>
          <input
            type="number"
            min="1"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            value={formData.numberOfGuests}
            onChange={e => setFormData({ ...formData, numberOfGuests: Number(e.target.value) })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Confirm Reservation'}
        </button>
      </form>
    </div>
  );
};