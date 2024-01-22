import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import { insertCard, insertProduct, insertUser } from "./insertActions.js";
import getCurrentDate from "./utils/functions.js";
import {
  getUser,
  deleteUser,
  updateUserData,
  changePassword,
} from "./userActions.js";
import { getCart } from "./cartActions.js";
import { updateCart } from "./cartActions.js";
import { getOrders } from "./ordersActions.js";
import { newOrder } from "./ordersActions.js";
import {
  getProductById,
  getCategories,
  newProduct,
  getAllProducts,
} from "./productActions.js";
import { newUser } from "./userActions.js";
import { insertOrder } from "./insertActions.js";

// const product = [
//   {
//     id: "1p0lrhxzer6",
//     title: "this is just a test",
//     description: "Again just a test",
//     price: 549,
//     discountPercentage: 12.96,
//     rating: 4.69,
//     stock: 94,
//     brand: "Apple",
//     category: "smartphones",
//     thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     images: [
//       "https://i.dummyjson.com/data/products/1/1.jpg",
//       "https://i.dummyjson.com/data/products/1/2.jpg",
//       "https://i.dummyjson.com/data/products/1/3.jpg",
//       "https://i.dummyjson.com/data/products/1/4.jpg",
//       "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     ],
//   },
// ];

// newProduct(product);

// newUser({
//   email_address: "ando.thiago@g.com",
//   first_name: "Thiago",
//   last_name: "Freitas",
//   password: '1234'

// });

// console.log(newUser({
//   email_address: "ando.norimar@gmail.com",
//   first_name: "Norimar",
//   last_name: "Ando",
//   password: '12345678'
// }))

// updateUserData({
//   newEmail:'ando.thiago@gmal.com',
//   email: "ando.norimar@gmail.com",
//   first: "Thiago",
//   last: "Ando",
// })

// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "4",
//   qnt: 3,
// });

// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "5",
//   qnt: 1,
// });
// updateCart({
//   user_id: "1p0lrhxzer6",
//   item_id: "6",
//   qnt: 1,
// });

// deleteUser("ando.norimar@gmail.com", "1p0lrhxzer6");

// newOrder("1p0lrhxzer6");

// changePassword("54321", "ando.norimar@gmail.com");

async function printU() {
  const prt = await getUser("ando.norimar@gmail.com", "12345678");
  console.log("printU==================");

  console.log(prt);
}
// printU();
function printC() {
  const prt = getCart("1p0lrhxzer6", 1);
  console.log("printC==================");

  console.log(prt);
}
// printC();
async function printO() {
  const prt = await getOrders("1p0lrhxzer6");
  console.log("printO==================");

  console.log(prt);
}
// printO();
function printPId() {
  const prt = getProductById({ productRows: "1" });
  console.log("printPId==================");

  console.log(prt);
}
printPId();

async function printP() {
  const prt = await getAllProducts();
  console.log(prt);
}
// printP();

function printCate() {
  const prt = getCategories();
  console.log(prt);
}
// printCate();

// db.prepare("DROP TABLE orders").run();
// console.log(deleteUser("ando.thiago@g.com"));
