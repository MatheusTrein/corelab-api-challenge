import { IColorProvider } from "../models/IColorProvider";

class FakeColorProvider implements IColorProvider {
  stringToHexa(name: string): string {
    return "#FAKE00";
  }
}

export { FakeColorProvider };
