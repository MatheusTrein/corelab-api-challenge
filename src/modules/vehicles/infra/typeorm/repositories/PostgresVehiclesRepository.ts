import { Repository } from "typeorm";

import { ICreateVehicle } from "@modules/vehicles/dtos/ICreateVehicle";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { Vehicle } from "../entities/Vehicle";
import connectionTypeORM from "@shared/infra/typeorm";
import { IFindVehicles } from "@modules/vehicles/dtos/IFindVehicles";

class PostgresVehiclesRepository implements IVehiclesRepository {
  private repository: Repository<Vehicle>;

  constructor() {
    this.repository = connectionTypeORM.getRepository(Vehicle);
  }

  async create(data: ICreateVehicle): Promise<Vehicle> {
    const vehicle = this.repository.create(data);

    await this.repository.save(vehicle);

    return vehicle;
  }

  async save(data: ICreateVehicle): Promise<Vehicle> {
    const vehicle = await this.repository.save(data);

    return vehicle;
  }

  async findById(id: number): Promise<Vehicle | null> {
    const vehicle = await this.repository.findOne({
      where: { id },
      relations: ["brand", "color"],
    });

    return vehicle;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await this.repository.findOne({ where: { plate } });

    return vehicle;
  }

  async findByQueryString(data: IFindVehicles): Promise<Vehicle[]> {
    const queryBuilder = this.repository
      .createQueryBuilder("vehicles")
      .leftJoinAndSelect("vehicles.brand", "brand_name")
      .leftJoinAndSelect("vehicles.color", "color_name")
      .orderBy("vehicles.created_at", "DESC");

    if (data.brand) {
      queryBuilder.andWhere("UPPER(vehicles.brand) = UPPER(:brand)", {
        brand: data.brand,
      });
    }

    if (data.color) {
      queryBuilder.andWhere("UPPER(vehicles.color) = UPPER(:color)", {
        color: data.color,
      });
    }

    if (data.minPrice) {
      queryBuilder.andWhere("vehicles.price >= :minPrice", {
        minPrice: data.minPrice,
      });
    }

    if (data.maxPrice) {
      queryBuilder.andWhere("vehicles.price <= :maxPrice", {
        maxPrice: data.maxPrice,
      });
    }

    if (data.year) {
      queryBuilder.andWhere("vehicles.year = :year", {
        year: data.year,
      });
    }

    if (data.textSearch) {
      queryBuilder.andWhere("UPPER(vehicles.*::text) like UPPER(:textSearch)", {
        textSearch: `%${data.textSearch}%`,
      });
    }

    const vehicles = await queryBuilder.getMany();

    return vehicles;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}

export { PostgresVehiclesRepository };
