import { MigrationInterface, QueryRunner } from 'typeorm';

const tableName = 'categories';

export class Initial1692709188006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "${tableName}" (
            id SERIAL PRIMARY KEY,
            slug VARCHAR NOT NULL CHECK(slug ~* '^[A-Z]*$') UNIQUE,
            name VARCHAR NOT NULL,
            description TEXT DEFAULT NULL,
            createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            active BOOLEAN DEFAULT TRUE
        );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "${tableName}";`);
  }
}
