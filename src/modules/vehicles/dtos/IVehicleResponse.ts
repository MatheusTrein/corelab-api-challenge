interface IVehicleResponse {
  id: number;
  name: string;
  brand: string;
  color: string;
  isFavorite: boolean;
  description: string;
  plate: string;
  year: number;
  price: number;
  createdAt: Date;
}

export { IVehicleResponse };
