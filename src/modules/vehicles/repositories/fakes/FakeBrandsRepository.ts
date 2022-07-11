import { Brand } from "@modules/vehicles/infra/typeorm/entities/Brand";
import { IBrandsRepository } from "../IBrandsRepository";

class FakeBrandsRepository implements IBrandsRepository {
  private repository: Brand[];

  constructor() {
    this.repository = [];
  }

  async create(name: string): Promise<Brand> {
    const brand = {} as Brand;

    Object.assign(brand, { name } as Brand);

    this.repository.push(brand);

    return brand;
  }

  async listAll(): Promise<Brand[]> {
    return this.repository;
  }
}

export { FakeBrandsRepository };
