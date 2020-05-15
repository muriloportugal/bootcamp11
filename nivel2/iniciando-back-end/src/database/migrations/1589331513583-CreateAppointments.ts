import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1589331513583
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        // Nome da tabela
        name: 'appointments',
        columns: [
          {
            // Primeira coluna id
            name: 'id',
            // Do tipo varchar por vamos usar o uuid
            type: 'uuid',
            // Chave PK
            isPrimary: true,
            // Gera o uuid de forma automática.
            generationStrategy: 'uuid',
            // Funcao que o postgres usa para gerar o uuid
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'date',
            // Tipo próprio do postgres
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
