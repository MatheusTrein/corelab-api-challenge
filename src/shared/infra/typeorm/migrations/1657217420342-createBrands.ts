import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createBrands1657217420342 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "brands",
        columns: [
          {
            name: "name",
            type: "varchar",
            isPrimary: true,
            isUnique: true,
            isNullable: false,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("brands");
  }
}
