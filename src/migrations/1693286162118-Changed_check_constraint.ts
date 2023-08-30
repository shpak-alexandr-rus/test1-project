import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'categories';

export class ChangedCheckConstraint1693286162118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE ${tableName} DROP CONSTRAINT categories_slug_check;
        `);
    await queryRunner.query(`
        ALTER TABLE ${tableName} ADD CHECK (slug ~* '^[A-Z ]*$' AND TRIM(slug) <> '');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE ${tableName} DROP CONSTRAINT categories_slug_check;
        `);
    await queryRunner.query(`
        ALTER TABLE ${tableName} ADD CHECK (slug ~* '^[A-Z]*$');
        `);
  }
}
