import { IVehicleResponse } from "../dtos/IVehicleResponse";
import { Vehicle } from "../infra/typeorm/entities/Vehicle";

class VehicleMapper {
  public static toDTO({
    brandName,
    colorName,
    brand,
    color,
    ...vehicle
  }: Vehicle): IVehicleResponse {
    return {
      ...vehicle,
      brand: brand.name,
      color: color.name,
    };
  }
}

export { VehicleMapper };
