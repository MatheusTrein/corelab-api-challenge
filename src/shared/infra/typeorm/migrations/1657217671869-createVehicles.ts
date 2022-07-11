import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createVehicles1657217671869 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "vehicles",
        columns: [
          {
            name: "id",
            type: "integer",
            isNullable: false,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "brand_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "color_name",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "description",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "plate",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "is_favorite",
            type: "boolean",
            default: false,
          },
          {
            name: "year",
            type: "integer",
            isNullable: false,
          },
          {
            name: "price",
            type: "decimal",
            precision: 9,
            scale: 2,
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKVehicleBrand",
            referencedTableName: "brands",
            referencedColumnNames: ["name"],
            columnNames: ["brand_name"],
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
          },
          {
            name: "FKVehicleColor",
            referencedTableName: "colors",
            referencedColumnNames: ["name"],
            columnNames: ["color_name"],
            onUpdate: "CASCADE",
            onDelete: "NO ACTION",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("vehicles");
  }
}
