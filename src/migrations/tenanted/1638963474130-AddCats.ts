import { MigrationInterface } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { MysqlQueryRunner } from 'typeorm/driver/mysql/MysqlQueryRunner';

export class AddCats1638963474130 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'AddCats1638963474130';

  public async up(queryRunner: MysqlQueryRunner): Promise<void> {
    const { database } = queryRunner.connection.options as MysqlConnectionOptions;

    await queryRunner.query(
      `CREATE TABLE ${database}.cats (id MEDIUMINT NOT NULL AUTO_INCREMENT, created_at TIMESTAMP NOT NULL DEFAULT now(), updated_at TIMESTAMP NOT NULL DEFAULT now(), name tinytext NOT NULL, PRIMARY KEY (id))`,
    );
  }

  public async down(queryRunner: MysqlQueryRunner): Promise<void> {
    const { database } = queryRunner.connection.options as MysqlConnectionOptions;

    await queryRunner.query(`DROP TABLE "${database}"."cats"`);
  }
}
