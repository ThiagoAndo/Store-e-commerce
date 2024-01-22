import { newUser } from "../../../Backend/userActions";

async function handler(req, res) {
  if (req.method === "POST") {
    const email_address = req.body.email;
    const first_name = req.body.fName;
    const last_name = req.body.lName;
    const password = req.body.password;

    let client;

    try {
      client = await newUser({
        email_address,
        first_name,
        last_name,
        password,
      });
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }
    console.log(client);
    res.status(201).json({ resp: client });
  }
}

export default handler;
