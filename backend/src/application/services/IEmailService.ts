import { Reservation } from '../../domain/entities/reservation';

export interface IEmailService {
  sendReservationConfirmation(customerEmail: string, reservationDetails: Reservation, cancelLink: string): Promise<void>;
}