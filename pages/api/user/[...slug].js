// import { buildFeedbackPath, extractFeedback } from '.';
import { NextRouter } from "next/router";
async function handler(req, res) {


  try {
    let response = await fetch(
      `https://libraryapi-gtct.onrender.com/events/user/${req.query.slug[0]}/${req.query.slug[1]}`
    );
    if (response.ok) {
      response = await response.json();

      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
  }
}

export default handler;
