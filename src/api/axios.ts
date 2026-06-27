// src/api/axios.ts

// تم التعديل إلى المنفذ 3005 ليطابق إعدادات الدوكر في الباك آيند
const BASE_URL = 'http://localhost:3000/api';

interface FetchOptions extends RequestInit {
  body?: any;
}

 
export const apiFetch = async (endpoint: string, options: FetchOptions = {}) => {
  const token = localStorage.getItem('admin_token');

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }), 
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
    cache: 'no-store',      
    ...(options.body && { body: JSON.stringify(options.body) }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'حدث خطأ ما أثناء الاتصال بالسيرفر');
  }

  if (response.status === 204) return null;

  const json = await response.json();
  return json.data !== undefined ? json.data : json;
};