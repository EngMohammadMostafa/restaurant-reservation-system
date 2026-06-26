import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ReservationForm } from './features/reservations/ReservationForm';
import { AdminDashboard } from './features/reservations/AdminDashboard';
import { AdminLogin } from './features/auth/AdminLogin';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* هيدر ثابت يظهر في جميع الصفحات ويوفر روابط التنقل */}
        <header className="bg-white shadow-sm border-b border-gray-100 py-6 mb-10">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <Link to="/">
                <h1 className="text-3xl font-extrabold text-amber-600 tracking-tight hover:text-amber-700 transition">Gourmet Haven</h1>
              </Link>
              <p className="text-sm text-gray-500 mt-1">Premium Restaurant Reservation System</p>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
                Book a Table
              </Link>
              <Link to="/login" className="text-sm font-bold text-gray-600 hover:text-gray-900 transition">
                Admin Login
              </Link>
            </div>
          </div>
        </header>

        {/* مساحة العرض الديناميكية (هنا تتغير الصفحات) */}
        <main className="max-w-5xl mx-auto px-4 pb-20 animate-fadeIn">
          <Routes>
            {/* المسار الافتراضي (الرئيسية): فورم حجز الزبون */}
            <Route path="/" element={<ReservationForm />} />
            
            {/* مسار صفحة تسجيل الدخول */}
            <Route path="/login" element={<AdminLogin />} />
            
            {/* مسار لوحة التحكم (محمية بداخلها) */}
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;