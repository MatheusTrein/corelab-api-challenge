import { ICreateColor } from "@modules/vehicles/dtos/ICreateColor";
import { Color } from "@modules/vehicles/infra/typeorm/entities/Color";
import { IColorsRepository } from "../IColorsRepository";

class FakeColorsRepository implements IColorsRepository {
  private fakeRepository: Color[];

  constructor() {
    this.fakeRepository = [];
  }

  async create({ name, hexaCode }: ICreateColor): Promise<Color> {
    const color = {} as Color;

    Object.assign(color, { name, hexaCode } as Color);

    this.fakeRepository.push(color);

    return color;
  }

  async listAll(): Promise<Color[]> {
    return this.fakeRepository;
  }
}

export { FakeColorsRepository };
