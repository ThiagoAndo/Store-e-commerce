import sql from "better-sqlite3";
const db = sql("e-comerce.db");

export function deleteImage(id) {
  const stmt = db.prepare("DELETE  FROM  images WHERE item_id = ?");
  const ret = stmt.run(id);
  console.log("images======================================");
  console.log(ret);
}
