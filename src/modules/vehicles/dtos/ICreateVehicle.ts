import { Brand } from "../infra/typeorm/entities/Brand";
import { Color } from "../infra/typeorm/entities/Color";

interface ICreateVehicle {
  id?: number;
  name: string;
  brand: Brand;
  color: Color;
  description: string;
  plate: string;
  year: number;
  price: number;
}

export { ICreateVehicle };
