interface ICreateAppError {
  message: string;
  statusCode?: number;
}

class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ message, statusCode = 400 }: ICreateAppError) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };
