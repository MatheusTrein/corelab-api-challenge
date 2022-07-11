import { Request, Response } from "express";
import { container } from "tsyringe";

import { FavoriteVehicleUseCase } from "./FavoriteVehicleUseCase";

class FavoriteVehicleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const favoriteVehicleUseCase = container.resolve(FavoriteVehicleUseCase);

    const vehicle = await favoriteVehicleUseCase.execute(Number(id));

    return response.json(vehicle);
  }
}

export { FavoriteVehicleController };
