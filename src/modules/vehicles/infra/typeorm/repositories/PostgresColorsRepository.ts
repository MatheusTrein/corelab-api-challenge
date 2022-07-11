import { Repository } from "typeorm";

import { ICreateColor } from "@modules/vehicles/dtos/ICreateColor";
import { IColorsRepository } from "@modules/vehicles/repositories/IColorsRepository";
import { Color } from "../entities/Color";
import connectionTypeORM from "@shared/infra/typeorm";

class PostgresColorsRepository implements IColorsRepository {
  private repository: Repository<Color>;

  constructor() {
    this.repository = connectionTypeORM.getRepository(Color);
  }

  async create(data: ICreateColor): Promise<Color> {
    const color = this.repository.create(data);

    await this.repository.save(color);

    return color;
  }

  async listAll(): Promise<Color[]> {
    const colors = await this.repository.find();

    return colors;
  }
}

export { PostgresColorsRepository };
