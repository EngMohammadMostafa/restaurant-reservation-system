import { IEmailService } from '../../application/services/IEmailService';
import { Reservation } from '../../domain/entities/reservation';

export class ConsoleEmailService implements IEmailService {
  async sendReservationConfirmation(customerEmail: string, reservationDetails: Reservation, cancelLink: string): Promise<void> {
    console.log(`\n--- [EMAIL SENT] ---`);
    console.log(`To: ${customerEmail}`);
    console.log(`Subject: Reservation Confirmed for ${reservationDetails.name}`);
    console.log(`Details: Date ${reservationDetails.date} at ${reservationDetails.time} for ${reservationDetails.numberOfGuests} guests.`);
    console.log(`To cancel your reservation, click here: ${cancelLink}`);
    console.log(`---------------------\n`);
  }
}