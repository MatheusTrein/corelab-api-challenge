import { RedisOptions } from "ioredis";

const redisConfig = {
  port: Number(process.env.REDIS_PORT),
  // host: "localhost", // descomentar essa linha se quiser rodar a aplicação fora de um container
  host: "redis_corelab-challenge_cache_development", // comentar essa linha se quiser rodar a aplicaçao fora de um container
  password: process.env.REDIS_PASSWORD,
} as RedisOptions;

if (process.env.NODE_ENV === "test") {
  // redisConfig.port = 63791; // descomentar essa linha se quiser rodar a aplicação fora de um container
  redisConfig.host = "redis_corelab-challenge_cache_tests"; // comentar essa linha se quiser rodar a aplicaçao fora de um container
}

export { redisConfig };
