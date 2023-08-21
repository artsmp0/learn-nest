import { AppDataSource } from "./data-source";
import { IdCard } from "./entity/IdCard";
import { User } from "./entity/User";

/*
是的，如果 idcard 表有一个 userId 外键，那么在这种情况下，idcard 表将被称为从表（子表），而与之关联的 userId 所在的表将被称为主表（父表）。

具体来说，如果你的数据库模型如下：

主表（父表）: 用户表（User），包含 userId 列作为主键。
从表（子表）: 身份证表（IDCard），包含 userId 外键列引用用户表的主键。
那么在这种情况下，IDCard 表就是一个从表，因为它引用了 User 表的主键作为外键。User 表就是一个主表，因为其他表引用它的主键作为外键。
 */
AppDataSource.initialize()
  .then(async () => {
    // const id = new IdCard();
    // id.id = 1;
    // await AppDataSource.manager.remove(IdCard, id);

    const user = new User();
    user.id = 1;
    user.firstName = "guang1111";
    user.lastName = "guang1111";
    user.age = 20;

    const idCard = new IdCard();
    idCard.id = 1;
    idCard.cardName = "22222";
    idCard.user = user;

    await AppDataSource.manager.save(idCard);
  })
  .catch((error) => console.log(error));
