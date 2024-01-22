import sql from "better-sqlite3";
const db = sql("e-comerce.db");
import pkg from "bcryptjs";
const { hash, compare } = pkg;
import uniqid from "uniqid";

import { deleteProduct } from "./productActions.js";
import { deleteCart } from "./cartActions.js";
import getCurrentDate from "./utils/functions.js";
import { insertUser } from "./insertActions.js";
import { deleteOrders } from "./ordersActions.js";
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "./utils/functions.js";

function allUsers() {
  const user = db.prepare("SELECT * FROM users").all();
}

export function getAllUsers() {
  const users = db.prepare("SELECT * FROM users").all();
  return users;
}

export async function newUser(user) {
  const { email_address, first_name, last_name, password } = user;
  if (!isEmailValid(email_address)) {
    return { error: "Email is not valid!" };
  } else if (!isNameValid(first_name + " " + last_name)) {
    return { error: "Name is not valid!" };
  } else if (!isPasswordValid(password)) {
    return { error: "Password is too short!" };
  }

  user.id = uniqid();
  user.password = await hash(user.password, 12);

  const conf = await getUser({ email_address, password });
  if (conf.error === "Not found") {
    insertUser(user);
    return { message: "registered" };
  } else {
    return { error: "user already registered" };
  }
}

export async function getUser({ email_address, password }) {
  const user = db
    .prepare("SELECT * FROM users WHERE email_address = ?")
    .get(email_address);
  if (!user) {
    return { error: "Not found" };
  } else {
    const isValid = await compare(password, user.password);
    if (isValid) {
      return user;
    } else {
      return { error: "Wrong Password" };
    }
  }
}

export function deleteUser({ email_address, id }) {
  deleteOrders(id);
  deleteCart(id);
  deleteProduct(id);

  const stmt = db.prepare("DELETE  FROM users WHERE email_address = ?");
  const ret = stmt.run(email);
}

export function updateUserData({ new_email, first, last, email_address }) {
  let stmt = db.prepare(
    `UPDATE users  SET email_address=?,first_name=?, last_name=? WHERE email_address  = ?`,
  );
  const ret = stmt.run(new_email, first, last, email_address);
}

export async function changePassword({ new_password, email_address }) {
  const password = await hash(new_password, 12);

  let stmt = db.prepare(
    `UPDATE users  SET password =? WHERE email_address  = ?`,
  );
  const ret = stmt.run(password, email_address);
}
