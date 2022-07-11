import Redis from "ioredis";

import { ICacheProvider } from "../models/ICacheProvider";
import { cacheConfig } from "@config/cache";

class RedisCacheProvider implements ICacheProvider {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async recover<T>(key: string): Promise<T | null> {
    let parsedValue: T | null = null;

    const value = await this.redisClient.get(key);

    if (value) {
      parsedValue = JSON.parse(value);
    }

    return parsedValue;
  }
  async invalidate(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.redisClient.keys(`${prefix}:*`);

    const pipeline = this.redisClient.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}

export { RedisCacheProvider };
