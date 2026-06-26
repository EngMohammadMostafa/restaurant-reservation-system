export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Reservation {
  id?: string; // اختياري لأنه يتولد تلقائياً في قاعدة البيانات
  name: string;
  date: string; // صيغة YYYY-MM-DD
  time: string; // صيغة HH:mm
  numberOfGuests: number;
  status: ReservationStatus;
  createdAt?: Date;
}