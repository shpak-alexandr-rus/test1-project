import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'categories';

export class ChangedColumnName1693290759686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE ${tableName} RENAME COLUMN createddate TO "createdDate";
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE ${tableName} RENAME COLUMN "createdDate" TO createddate;
        `);
  }
}
