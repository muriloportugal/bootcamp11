// import { uuid } from 'uuidv4';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

// Entity para dizer que essa classe Appointment esta ligada a tabela appointments
@Entity('appointments')
class Appointment {
  // AGora em todas as propriedades que forem colunas da tabela no banco,
  // colocamos o @Column(<tipo da coluna>) ou o PrimaryGeneratedColumn(<tipo>)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  // Muitos apontamentos pra um usuário
  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' }) // Qual coluna vai identificar o provider
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Não será mais necessário o método constructor agora que estamos usando o
  // TypeORM.
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  //   // Omit é um helper do TS, ele fala que o objeto { } antes dele é do tipo Appointment
  //   // mas sem o id, pois o id estamos criando manualmente.
  //   // Por isso que no objeto só desestruturamos { provder, date }
  //   this.id = uuid();
  //   this.provider = provider;
  //   this.date = date;
  // }
}

export default Appointment;
