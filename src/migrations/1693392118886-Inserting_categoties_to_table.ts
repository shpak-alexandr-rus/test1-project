import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'categories';

export class InsertingCategotiesToTable1693392118886
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO ${tableName} (slug, name, description)
        VALUES(
            'first',
            'First category',
            'It is first category description.'
        ), (
            'second',
            'Second category',
            'It is second category description.'
        ), (
            'third',
            'Third category',
            'It is third category description.'
        ), (
            'honey',
            'Мёд',
            'It is Мёд category description.'
        );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ${tableName} WHERE slug = 'first';`);
    await queryRunner.query(`DELETE FROM ${tableName} WHERE slug = 'second';`);
    await queryRunner.query(`DELETE FROM ${tableName} WHERE slug = 'third';`);
    await queryRunner.query(`DELETE FROM ${tableName} WHERE slug = 'honey';`);
  }
}
