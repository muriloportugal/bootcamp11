import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// http://localhost:3333/appointments

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  // Cria um novo apontamento
  // Valida se já existe apontamento na mesma data.
  // Todo apontamento é criado usando hora cheia
  const { provider_id, date } = request.body;

  try {
    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
