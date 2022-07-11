import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createColors1657217451151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "colors",
        columns: [
          {
            name: "name",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
          {
            name: "hexa_code",
            type: "varchar",
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("colors");
  }
}
