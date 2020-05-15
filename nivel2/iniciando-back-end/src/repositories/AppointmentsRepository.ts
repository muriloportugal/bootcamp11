import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';
// Necessário a cria de um repository para Appointments pois criamos uma função
// que o TypeORM não oferece por padrão, nesse caso á findByDate()

// Decorator EntityRepository que irá receber qual o model ele estará ligado
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  // Busca um agendamento pela data
  public async findByDate(date: Date): Promise<Appointment | null> {
    // this.findOne porque a classe herdou os métodos de Repository e como
    // passamos o nosso model Appointment como parâmetro desse Repository
    // ele tem acesso aos dados desse model
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
