import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit é um helper do TS, ele fala que o objeto { } antes dele é do tipo Appointment
    // mas sem o id, pois o id estamos criando manualmente.
    // Por isso que no objeto só desestruturamos { provder, date }
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
