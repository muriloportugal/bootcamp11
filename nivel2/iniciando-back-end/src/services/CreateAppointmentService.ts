import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

// DTO
interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    // Instância do repositorio, agora appointmentsRepository tem todos os métodos
    // de AppointmentsRepository, não usamos mais o = new AppointmentsRepository
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }
    // método create cria uma instância de um novo objeto mas não salva no banco
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });
    // Agora salva no banco passando como propriedade o dado que será salvo
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;
