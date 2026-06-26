import { Request, Response } from 'express';
import { GetReservationsUseCase } from '../../application/use-cases/GetReservationsUseCase';
import { CreateReservationUseCase } from '../../application/use-cases/CreateReservationUseCase';
import { UpdateReservationStatusUseCase } from '../../application/use-cases/UpdateReservationStatusUseCase';

export class ReservationController {
  constructor(
    private getReservationsUseCase: GetReservationsUseCase,
    private createReservationUseCase: CreateReservationUseCase,
    private updateReservationStatusUseCase: UpdateReservationStatusUseCase
  ) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const reservations = await this.getReservationsUseCase.execute();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const { name, date, time, numberOfGuests, customerEmail } = req.body;
      
      // نمرر البيانات لطبقة الـ Application لتتكفل بالباقي
      const reservation = await this.createReservationUseCase.execute(
        { name, date, time, numberOfGuests },
        customerEmail || 'customer@example.com' // قيمة افتراضية للتجربة
      );
      
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;  
      const { status } = req.body;
      
      const reservation = await this.updateReservationStatusUseCase.execute(id, status);
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}