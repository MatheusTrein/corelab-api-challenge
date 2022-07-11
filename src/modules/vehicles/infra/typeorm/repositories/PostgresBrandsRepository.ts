import { Repository } from "typeorm";

import { IBrandsRepository } from "@modules/vehicles/repositories/IBrandsRepository";
import { Brand } from "../entities/Brand";
import connectionTypeORM from "@shared/infra/typeorm";

class PostgresBrandsRepository implements IBrandsRepository {
  private repository: Repository<Brand>;

  constructor() {
    this.repository = connectionTypeORM.getRepository(Brand);
  }

  async create(name: string): Promise<Brand> {
    const brand = this.repository.create({ name });

    await this.repository.save(brand);

    return brand;
  }

  async listAll(): Promise<Brand[]> {
    const brands = await this.repository.find();

    return brands;
  }
}

export { PostgresBrandsRepository };
