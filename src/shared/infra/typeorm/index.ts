import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

let config: DataSourceOptions = {
  type: "postgres",
  port: 5432,
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  migrations: [
    "./src/shared/infra/typeorm/migrations/*.ts",
    "./src/shared/infra/typeorm/migrations",
  ],
};

if (process.env.NODE_ENV === "test") {
  Object.assign(config, {
    // host: "localhost", // descomentar essa linha se quiser rodar a aplicaçao fora de um container
    // port: 54321, // descomentar essa linha se quiser rodar a aplicaçao fora de um container
    host: "postgres_corelab-challenge_tests", // comentar essa linha se quiser rodar a aplicaçao fora de um container
    username: "corelabchallenge",
    password: "corelabchallenge",
    database: "corelab-challenge_tests",
  } as DataSourceOptions);
} else if (process.env.NODE_ENV === "development") {
  Object.assign(config, {
    // host: "localhost", // descomentar essa linha se quiser rodar a aplicaçao fora de um container
    host: "postgres_corelab-challenge_development", // comentar essa linha se quiser rodar a aplicaçao fora de um container
    username: "corelabchallenge",
    password: "corelabchallenge",
    database: "corelab-challenge",
  } as DataSourceOptions);
}

export default new DataSource(config);
