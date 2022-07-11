import { container } from "tsyringe";

import "./providers";

import { PostgresVehiclesRepository } from "@modules/vehicles/infra/typeorm/repositories/PostgresVehiclesRepository";
import { IVehiclesRepository } from "@modules/vehicles/repositories/IVehiclesRepository";
import { IBrandsRepository } from "@modules/vehicles/repositories/IBrandsRepository";
import { PostgresBrandsRepository } from "@modules/vehicles/infra/typeorm/repositories/PostgresBrandsRepository";
import { IColorsRepository } from "@modules/vehicles/repositories/IColorsRepository";
import { PostgresColorsRepository } from "@modules/vehicles/infra/typeorm/repositories/PostgresColorsRepository";

container.registerSingleton<IVehiclesRepository>(
  "VehiclesRepository",
  PostgresVehiclesRepository
);

container.registerSingleton<IBrandsRepository>(
  "BrandsRepository",
  PostgresBrandsRepository
);

container.registerSingleton<IColorsRepository>(
  "ColorsRepository",
  PostgresColorsRepository
);
