import { resolve } from "styled-jsx/css";
import { newUser, getUser } from "../userActions";

function handler(req, res) {
  if (req.method === "POST") {
    const email_address = req.body.email;
    const first_name = req.body.fName;
    const last_name = req.body.lName;
    const password = req.body.password;
  
    newUser({
      email_address,
      first_name,
      last_name,
      password,
    })
      .then((response) => response.json())
      .then((data) => {
        res.status(201).json(data);
      });
  }
}

export default handler;
