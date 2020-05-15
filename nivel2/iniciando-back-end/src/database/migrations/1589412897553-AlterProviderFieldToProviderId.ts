import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1589412897553
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    // Criando a chave estrangeira
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        // Nome da foreingKey
        name: 'appointmentProvider',
        // Nome da coluna na tabela appointments que será a chave estrangeira
        columnNames: ['provider_id'],
        // Nome da coluna na tabela users que vai vir pra esta tabela
        referencedColumnNames: ['id'],
        // Tabela de onde ta vindo a chave estrangeira
        referencedTableName: 'users',
        // Se o registro na tabela users for deletado, nesta tabela (appointments) seta esse campo como null
        onDelete: 'SET NULL',
        // se o id do usuário mudar na tabela users mudar, muda ele aqui tbm, para manter a identificação
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Na hora de desfazer as alterações, devemos lembrar que tem que ser na
    // ordem inversa dos itens que foram criados.
    await queryRunner.dropForeignKey('appointments', 'appointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }
}
