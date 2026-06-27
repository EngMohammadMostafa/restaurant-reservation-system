import { Request, Response, NextFunction } from 'express';
import { ReservationService } from './reservation.service';
import { AppError } from '../../shared/utils/app-error';

const reservationService = new ReservationService();

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.status(200).json({ status: 'success', data: reservations });
  } catch (error) {
    next(error);  
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const newReservation = await reservationService.createReservation(req.body);
    res.status(201).json({ status: 'success', data: newReservation });
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id) {
      throw new AppError('Reservation ID is required', 400);
    }

    // هنا نقوم بتحويل النوع صراحة إلى string لمنع اعتراض التايب سكريبت نهائياً
    const reservationId = id as string;

    const updated = await reservationService.updateReservationStatus(reservationId, status);
    res.status(200).json({ status: 'success', data: updated });
  } catch (error) {
    next(error);
  }
};

export const cancelPublic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      throw new AppError('Reservation ID is required', 400);
    }

    // هنا نقوم بتحويل النوع صراحة إلى string لمنع اعتراض التايب سكريبت نهائياً
    const reservationId = id as string;

    await reservationService.publicCancelReservation(reservationId);
    res.status(200).send('<h1>Your reservation has been successfully cancelled. We hope to see you another time!</h1>');
  } catch (error) {
    next(error);
  }
};