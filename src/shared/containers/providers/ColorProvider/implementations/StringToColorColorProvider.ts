import stc from "string-to-color";

import { IColorProvider } from "../models/IColorProvider";

class StringToColorColorProvider implements IColorProvider {
  private stringToColor: (name: string) => string;

  constructor() {
    this.stringToColor = stc;
  }

  stringToHexa(name: string): string {
    return this.stringToColor(name);
  }
}

export { StringToColorColorProvider };
