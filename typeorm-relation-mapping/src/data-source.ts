import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { IdCard } from "./entity/IdCard";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "artsmp",
  database: "typeorm_test",
  synchronize: true,
  logging: true,
  entities: [User, IdCard],
  migrations: [],
  subscribers: [],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
  poolSize: 10,
  // subscribers 是一些 Etity 生命周期的订阅者，比如 insert、update、remove 前后，可以加入一些逻辑
});
