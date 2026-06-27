// src/types/index.ts

export interface Dish {
  id: string;
  dishName: string; // تم التعديل هنا لمطابقة الباك آيند
  price: number;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string; 
  time: string; 
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled'; 
  createdAt?: string;
}

export interface AdminAuth {
  token: string;
  username: string;
}