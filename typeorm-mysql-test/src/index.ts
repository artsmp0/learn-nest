import { In } from "typeorm";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

AppDataSource.initialize()
  .then(async () => {
    // 批量删除和修改
    // await AppDataSource.manager.save(User, [
    //   { firstName: "ccc", lastName: "ccc", age: 21 },
    //   { firstName: "ddd", lastName: "ddd", age: 22 },
    //   { firstName: "eee", lastName: "eee", age: 23 },
    // ]);

    // 批量删除
    // await AppDataSource.manager.delete(User, [1]);
    // or remove
    // const u = new User();
    // u.id = 2;
    // await AppDataSource.manager.remove(User, u);

    // 条件查询
    // const uu = await AppDataSource.manager.findBy(User, {
    //   age: 23,
    // });
    // const [uu, count] = await AppDataSource.manager.findAndCount(User);
    // console.log("uu: ", uu, count);

    // const user = await AppDataSource.manager.findOne(User, {
    //   select: ["firstName", "lastName"],
    //   where: {
    //     id: 4,
    //   },
    // });
    // const user = await AppDataSource.manager.find(User, {
    //   select: ["firstName", "lastName"],
    //   where: {
    //     id: In([3, 6]),
    //   },
    //   order: {
    //     age: "DESC",
    //   },
    // });
    // console.log("user: ", user);

    const queryBuilder = await AppDataSource.manager.createQueryBuilder();

    const user = await queryBuilder
      .select("user")
      .from(User, "user")
      .where("user.age = :age", { age: 21 })
      .getOne();

    console.log(user);

    const users = await AppDataSource.manager.find(User);
    console.log("Loaded users: ", users);
  })
  .catch((error) => console.log(error));
