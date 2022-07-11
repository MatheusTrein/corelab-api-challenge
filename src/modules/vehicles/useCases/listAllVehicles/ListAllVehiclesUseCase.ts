import { inject, injectable } from "tsyringe";

import { IVehicleResponse } from "@modules/vehicles/dtos/IVehicleResponse";
import { VehicleMapper } from "@modules/vehicles/mappers/VehicleMapper";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";

interface IRequest {
  brand?: string;
  color?: string;
  maxPrice?: number;
  minPrice?: number;
  year?: number;
  textSearch?: string;
}

@injectable()
class ListAllVehiclesUseCase {
  constructor(
    @inject("VehiclesRepository")
    private vehiclesRepository: IVehiclesRepository
  ) {}

  async execute(searchData: IRequest): Promise<IVehicleResponse[]> {
    const vehicles = await this.vehiclesRepository.findByQueryString(
      searchData
    );

    return vehicles.map((vehicle) => VehicleMapper.toDTO(vehicle));
  }
}

export { ListAllVehiclesUseCase };
