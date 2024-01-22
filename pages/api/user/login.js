async function handler(req, res) {
  const email_address = req.body.email;
  const password = req.body.password;

  let client;
  try {
    let response = await fetch("https://libraryapi-gtct.onrender.com/events");
    if (response.ok) {
      response = await response.json();

      res.status(200).json(response);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
  }
}

export default handler;
