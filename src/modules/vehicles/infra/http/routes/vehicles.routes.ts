import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";

import { CreateVehicleController } from "@modules/vehicles/useCases/createVehicle/CreateVehicleController";
import { ListAllBrandsController } from "@modules/vehicles/useCases/listAllBrands/ListAllBrandsController";
import { UpdateVehicleController } from "@modules/vehicles/useCases/updateVehicle/UpdateVehicleController";
import { ListAllVehiclesController } from "@modules/vehicles/useCases/listAllVehicles/ListAllVehiclesController";
import { DeleteVehicleController } from "@modules/vehicles/useCases/deleteVehicle/DeleteVehicleController";
import { ListAllColorsController } from "@modules/vehicles/useCases/listAllColors/ListAllColorsControllers";
import { FavoriteVehicleController } from "@modules/vehicles/useCases/favoriteVehicle/FavoriteVehicleController";

const plateRegEx = /[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/;

const createVehicleController = new CreateVehicleController();
const updateVehicleController = new UpdateVehicleController();
const listAllVehiclesUseCase = new ListAllVehiclesController();
const listAllBrandsController = new ListAllBrandsController();
const listAllColorsController = new ListAllColorsController();
const deleteVehicleController = new DeleteVehicleController();
const favoriteVehicleController = new FavoriteVehicleController();

const vehiclesRouter = Router();

vehiclesRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      brand: Joi.string().trim().required(),
      plate: Joi.string().trim().regex(plateRegEx).required(),
      year: Joi.number().integer().required(),
      color: Joi.string().trim().required(),
      price: Joi.number().min(1).required(),
    }),
  }),
  createVehicleController.handle
);

vehiclesRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      brand: Joi.string().trim().required(),
      plate: Joi.string().trim().regex(plateRegEx).required(),
      year: Joi.number().integer().required(),
      color: Joi.string().trim().required(),
      price: Joi.number().min(1).required(),
    }),
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  updateVehicleController.handle
);

vehiclesRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: Joi.object({
      brand: Joi.string().trim(),
      color: Joi.string().trim(),
      maxPrice: Joi.number().min(1),
      minPrice: Joi.number().min(0),
      year: Joi.number().integer(),
      textSearch: Joi.string().trim(),
    }),
  }),
  listAllVehiclesUseCase.handle
);

vehiclesRouter.get("/brands", listAllBrandsController.handle);
vehiclesRouter.get("/colors", listAllColorsController.handle);

vehiclesRouter.patch(
  "/favorite/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  favoriteVehicleController.handle
);

vehiclesRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  deleteVehicleController.handle
);

export { vehiclesRouter };
