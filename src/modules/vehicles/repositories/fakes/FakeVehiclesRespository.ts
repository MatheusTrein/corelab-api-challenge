import { ICreateVehicle } from "@modules/vehicles/dtos/ICreateVehicle";
import { IFindVehicles } from "@modules/vehicles/dtos/IFindVehicles";
import { Vehicle } from "@modules/vehicles/infra/typeorm/entities/Vehicle";
import { IVehiclesRepository } from "../IVehiclesRepository";

class FakeVehiclesRepository implements IVehiclesRepository {
  private fakeRepository: Vehicle[];

  constructor() {
    this.fakeRepository = [];
  }

  async create(data: ICreateVehicle): Promise<Vehicle> {
    const vehicle = {} as Vehicle;

    Object.assign(vehicle, {
      ...data,
      id: this.fakeRepository.length + 1,
      createdAt: new Date(),
      isFavorite: false,
    } as Vehicle);

    this.fakeRepository.push(vehicle);

    return vehicle;
  }

  async save(data: ICreateVehicle): Promise<Vehicle> {
    const vehicleIndex = this.fakeRepository.findIndex(
      (vehicle) => vehicle.id === data.id
    );

    this.fakeRepository[vehicleIndex] = {
      ...data,
      isFavorite: this.fakeRepository[vehicleIndex].isFavorite,
      createdAt: this.fakeRepository[vehicleIndex].createdAt,
    } as Vehicle;

    return this.fakeRepository[vehicleIndex];
  }

  async findById(id: number): Promise<Vehicle | null> {
    const vehicle =
      this.fakeRepository.find((vehicle) => vehicle.id === id) || null;

    return vehicle;
  }

  async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle =
      this.fakeRepository.find((vehicle) => vehicle.plate === plate) || null;

    return vehicle;
  }

  async findByQueryString({
    brand,
    color,
    year,
    textSearch,
    maxPrice,
    minPrice,
  }: IFindVehicles): Promise<Vehicle[]> {
    let vehicles = this.fakeRepository;

    if (brand) {
      vehicles = vehicles.filter((vehicle) =>
        vehicle.brand.name.search(brand) === -1 ? false : true
      );
    }

    if (color) {
      vehicles = vehicles.filter((vehicle) =>
        vehicle.color.name.search(color) === -1 ? false : true
      );
    }

    if (minPrice) {
      vehicles = vehicles.filter((vehicle) => vehicle.price >= minPrice);
    }

    if (maxPrice) {
      vehicles = vehicles.filter((vehicle) => vehicle.price <= maxPrice);
    }

    if (year) {
      vehicles = vehicles.filter((vehicle) => vehicle.year === year);
    }

    if (textSearch) {
      vehicles = vehicles.filter((vehicle) => {
        let vehicleObject: { [key: string]: any } = vehicle;

        const keys = Object.keys(vehicleObject);

        const booleans = keys.map((key) => {
          if (String(vehicleObject[key]).search(textSearch) !== -1) {
            return true;
          } else {
            return false;
          }
        });

        return booleans.some((boolean) => boolean === true);
      });
    }

    return vehicles;
  }

  async delete(id: number): Promise<void> {
    const indexVehicle = this.fakeRepository.findIndex(
      (vehicle) => vehicle.id === id
    ) as number;

    this.fakeRepository.splice(indexVehicle, 1);
  }
}

export { FakeVehiclesRepository };
