import { ICreateColor } from "../dtos/ICreateColor";
import { Color } from "../infra/typeorm/entities/Color";

interface IColorsRepository {
  create(data: ICreateColor): Promise<Color>;
  listAll(): Promise<Color[]>;
}

export { IColorsRepository };
