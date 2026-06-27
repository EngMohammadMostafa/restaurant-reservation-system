export interface IReservation {
  id: string;
  name: string;
  email: string; // <--- إضافة حقل الإيميل هنا لحل مشكلة السيرفيس
  date: string;  // YYYY-MM-DD
  time: string;  // HH:MM
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}