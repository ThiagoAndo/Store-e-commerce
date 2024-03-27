import pkg from "bcryptjs";
const { hash } = pkg;
import uniqid from "uniqid";
import { getCurrentDate } from "../../../helpers/functions";
async function handler(req, res) {
  if (req.method === "POST") {
    const client = req.body;
    client.password = await hash(client.password, 12);
    client.id = uniqid();
    client.created_at = getCurrentDate();
    try {
      let response = await fetch(
        "http://localhost:8080/events/user/new",
        // "https://libraryapi-gtct.onrender.com/events/user/new",

        {
          method: "POST",
          body: JSON.stringify(client),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (response.ok) {
        response = await response.json();
        res.status(200).json(response);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error || "Connecting to the database failed!" });
    }
  }
}

export default handler;
