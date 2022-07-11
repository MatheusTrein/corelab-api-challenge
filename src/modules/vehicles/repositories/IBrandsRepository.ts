import { Brand } from "../infra/typeorm/entities/Brand";

interface IBrandsRepository {
  create(name: string): Promise<Brand>;
  listAll(): Promise<Brand[]>;
}

export { IBrandsRepository };
