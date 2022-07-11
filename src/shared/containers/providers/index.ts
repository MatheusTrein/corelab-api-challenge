import { container } from "tsyringe";

import { cacheConfig } from "@config/cache";

import { RedisCacheProvider } from "./CacheProvider/implementations/RedisCacheProvider";
import { ICacheProvider } from "./CacheProvider/models/ICacheProvider";
import { StringToColorColorProvider } from "./ColorProvider/implementations/StringToColorColorProvider";
import { IColorProvider } from "./ColorProvider/models/IColorProvider";

const cacheProviders: any = {
  redis: RedisCacheProvider,
};

container.registerSingleton<IColorProvider>(
  "ColorProvider",
  StringToColorColorProvider
);

container.registerSingleton<ICacheProvider>(
  "CacheProvider",
  cacheProviders[cacheConfig.driver]
);
