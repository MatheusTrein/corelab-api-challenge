import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllVehiclesUseCase } from "./ListAllVehiclesUseCase";

class ListAllVehiclesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, color, year, minPrice, maxPrice, textSearch } =
      request.query;

    const listAllVehiclesUseCase = container.resolve(ListAllVehiclesUseCase);

    const vehicles = await listAllVehiclesUseCase.execute({
      brand: brand as string,
      color: color as string,
      year: Number(year),
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      textSearch: textSearch as string,
    });

    return response.json(vehicles);
  }
}

export { ListAllVehiclesController };
