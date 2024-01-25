import pkg from "bcryptjs";
const { hash } = pkg;
import uniqid from "uniqid";
import { getCurrentDate } from "../../../utils/functions";
async function handler(req, res) {
  if (req.method === "POST") {
    const client = req.body;
    client.password = await hash(client.password, 12);
    client.id = uniqid();
    client.created_at = getCurrentDate();
    console.log(client)
    try {
      let response = await fetch("http://localhost:8080/events/user/new", {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(response)
        // response = await response.json();
        // if (response.status === 404) {
        //   res.status(404).json({
        //     message: response.message,
        //   });
        // } else {
        //   res.status(200).json(response);
        // }
      }
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ message: error || "Connecting to the database failed!" });
    }
  
  }
}

export default handler;
