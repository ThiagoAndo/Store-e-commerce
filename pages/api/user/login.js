import { getUser } from "../../../Backend/userActions";

async function handler(req, res) {
  const email_address = req.body.email;
  const password = req.body.password;

  let client;

  try {
    client = await getUser({
      email_address,
      password,
    });
    console.log(client);
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  res.status(200).json({ resp: client });
}

export default handler;
