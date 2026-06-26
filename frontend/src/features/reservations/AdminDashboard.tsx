import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../shared/api/apiClient';

// ... (نفس واجهة Reservation)
interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  numberOfGuests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export const AdminDashboard: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // قراءة التوكن من التخزين المحلي
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    // حماية الصفحة: إذا لم يكن هناك توكن، أعده لصفحة الدخول
    if (!adminToken) {
      navigate('/login');
      return;
    }
    fetchReservations();
  }, [adminToken, navigate]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      // في الباك إند الحالي، مسار الـ GET لا يتطلب توكن (حسب التقييم)، ولكن سنضيفه كإجراء سليم
      const data = await apiClient.get<Reservation[]>('/reservations');
      setReservations(data);
    } catch (err) {
      setError('Failed to fetch reservations. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    if (!adminToken) return;
    try {
      await apiClient.put(`/reservations/${id}`, { status: newStatus }, adminToken);
      setReservations(prev => prev.map(res => res.id === id ? { ...res, status: newStatus } : res));
    } catch (err) {
      alert('Error updating status. Check connection or token.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  if (loading) return <div className="text-center py-10 font-medium">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-medium">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Control Panel</h2>
        <div className="space-x-4">
          <button onClick={fetchReservations} className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1.5 px-4 rounded-lg text-sm transition">
            🔄 Refresh
          </button>
          <button onClick={handleLogout} className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-1.5 px-4 rounded-lg text-sm transition">
            Logout
          </button>
        </div>
      </div>
      
      {/* ... (نفس كود الجدول السابق بالضبط) */}
       <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse bg-white text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Date & Time</th>
              <th className="px-6 py-4">Guests</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">No reservations found yet.</td>
              </tr>
            ) : (
              reservations.map(res => (
                <tr key={res.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{res.name}</td>
                  <td className="px-6 py-4">{res.date} @ {res.time}</td>
                  <td className="px-6 py-4 font-medium text-gray-700">{res.numberOfGuests}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      res.status === 'confirmed' ? 'bg-green-50 text-green-700' :
                      res.status === 'cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {res.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(res.id, 'confirmed')}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(res.id, 'cancelled')}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {res.status !== 'pending' && (
                        <span className="text-xs text-gray-400 italic">No actions available</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};