import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTenants1638963391898 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'AddTenants1638963391898';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE tenants (id MEDIUMINT NOT NULL AUTO_INCREMENT, created_at TIMESTAMP NOT NULL DEFAULT now(), updated_at TIMESTAMP NOT NULL DEFAULT now(), name tinytext NOT NULL, handle tinytext NOT NULL, PRIMARY KEY(id))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "tenants"');
  }
}
