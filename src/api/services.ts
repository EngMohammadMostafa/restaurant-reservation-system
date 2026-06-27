// src/api/services.ts
import { apiFetch } from './axios';
import type { Dish, Reservation, AdminAuth } from '../types';

export const apiServices = {
  // --- خدمات الزبائن العامة ---
  getMenu: (): Promise<Dish[]> => {
    return apiFetch('/menu');
  },

  createReservation: (data: Omit<Reservation, 'id' | 'status'>): Promise<Reservation> => {
    return apiFetch('/reservations', {
      method: 'POST',
      body: data,
    });
  },

  // --- خدمات الإدارة (الأدمن) ---
  
  // تم التعديل للاتصال بمسار تسجيل الدخول الحقيقي في الباك آيند
  adminLogin: (credentials: { username: string; password: string }): Promise<AdminAuth> => {
    return apiFetch('/auth/login', {
      method: 'POST',
      body: credentials,
    });
  },

  getReservations: (): Promise<Reservation[]> => {
    return apiFetch('/reservations');
  },

  updateReservationStatus: (id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation> => {
    return apiFetch(`/reservations/${id}`, {
      method: 'PUT',
      body: { status },
    });
  },

  addDish: (dish: { dishName: string; price: number }): Promise<Dish> => {
    return apiFetch('/menu', {
      method: 'POST',
      body: dish,
    });
  },

  updateDishPrice: (id: string, price: number): Promise<Dish> => {
    return apiFetch(`/menu/${id}`, {
      method: 'PUT',
      body: { price },
    });
  }
};