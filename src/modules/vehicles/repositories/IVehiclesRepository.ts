import { ICreateVehicle } from "../dtos/ICreateVehicle";
import { IFindVehicles } from "../dtos/IFindVehicles";
import { Vehicle } from "../infra/typeorm/entities/Vehicle";

interface IVehiclesRepository {
  create(data: ICreateVehicle): Promise<Vehicle>;
  save(data: ICreateVehicle): Promise<Vehicle>;
  findById(id: number): Promise<Vehicle | null>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  findByQueryString(data: IFindVehicles): Promise<Vehicle[]>;
  delete(id: number): Promise<void>;
}

export { IVehiclesRepository };
