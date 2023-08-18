const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "artsmp",
  database: "practice",
});

// connection.query(
//   "select * from customers where name like ?",
//   ["李%"],
//   function (err, results, fields) {
//     console.log(results);
//     console.log(fields.map((item) => item.name));
//   }
// );

// connection.execute(
//   "insert into customers (name) values (?)",
//   ["阿北"],
//   (err, results, fields) => {
//     console.log("err, results, fields: ", err, results, fields);
//   }
// );

// connection.execute(
//   'update customers set name="artsmp" where name="阿北"',
//   (err) => console.log(err)
// );

connection.execute("delete from customers where name = ?", ["artsmp"], (err) =>
  console.log(err)
);
