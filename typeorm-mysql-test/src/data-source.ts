import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Aaa } from "./entity/Aaa";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "artsmp",
  database: "practice",
  synchronize: true,
  logging: true,
  // 指定有哪些和表对应的 Entity
  entities: [User, Aaa],
  // entities: ["./entity/*.ts"],
  connectorPackage: "mysql2",
  extra: {
    authPlugin: "sha256_password",
  },
  poolSize: 10,
  migrations: [],
  // subscribers 是一些 Entity 生命周期的订阅者，比如 insert、update、remove 前后，可以加入一些逻辑
  subscribers: [],
});
