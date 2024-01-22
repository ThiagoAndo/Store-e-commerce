import sql from "better-sqlite3";
const db = sql("e-comerce.db");
db.prepare(
  `
   CREATE TABLE IF NOT EXISTS products (
       id TEXT NOT NULL  PRIMARY KEY,
       title TEXT NOT NULL UNIQUE,
       description TEXT NOT NULL,
       price FLOAT NOT NULL,
       discountPercentage FLOAT NOT NULL,
       rating FLOAT NOT NULL,
       stock INT NOT NULL,
       brand TEXT NOT NULL,
       category TEXT NOT NULL,
       thumbnail TEXT NOT NULL
    )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS images (
       item_id TEXT NOT NULL ,
       image TEXT NOT NULL,
       FOREIGN KEY (item_id)
       REFERENCES products (id) 
         )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS users (
      email_address      TEXT NOT NULL UNIQUE,
      first_name         TEXT NOT NULL,
      last_name          TEXT NOT NULL,
      created_at         TIMESTAMP,
      id                 TEXT NOT NULL PRIMARY KEY,
      password           TEXT NOT NULL UNIQUE
      )
`,
).run();

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS cart (
      user_id  TEXT NOT NULL ,
      item_id  TEXT NOT NULL ,
      qnt      INTEGER,
      bought   INTEGER,
      creation_at TIMESTAMP NOT NULL,
      FOREIGN KEY (item_id)
      REFERENCES products (id),
      FOREIGN KEY (user_id)
      REFERENCES users (id) 
         )
`,
).run();
db.prepare(
  `
   CREATE TABLE IF NOT EXISTS orders (
      invoice_id  INTEGER PRIMARY KEY AUTOINCREMENT,
      cart_id         INTEGER,
      user_id         TEXT NOT NULL,
      paid_at         TIMESTAMP,
      total           REAL,
      FOREIGN KEY (user_id)
      REFERENCES users (id)
      )
`,
).run();

export function insertProduct(product) {
  const prts = product || products;
  const stmt = db.prepare(`
      INSERT INTO products VALUES (
         @id,
         @title,
         @description,
         @price,
         @discountPercentage,
         @rating,
         @stock,
         @brand,
         @category,
         @thumbnail
      )
   `);

  const stmt2 = db.prepare(`
      INSERT INTO images VALUES (
         @itemId,
         @image
      )
   `);

  for (const product of prts) {
    product.id = String(product.id);
    stmt.run(product);
    for (const img in product.images) {
      stmt2.run({
        itemId: product.id,
        image: Object.values(product.images)[img],
      });
    }
  }
}
insertProduct();
