// import { buildFeedbackPath, extractFeedback } from '.';
import { NextRouter } from "next/router";
async function handler(req, res) {
  const email_address = req.body.email;
  const password = req.body.password;

  try {
    let response = await fetch(
      `http://localhost:8080/events/user/${req.query.slug[0]}/${req.query.slug[1]}`
    );
    if (response.ok) {
      response = await response.json();
      if (response.status === 404) {
        res.status(404).json({
          message: response.message ,
        });
      } else {
        res.status(200).json(response);
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: error || "Connecting to the database failed!" });
  }
}

export default handler;
