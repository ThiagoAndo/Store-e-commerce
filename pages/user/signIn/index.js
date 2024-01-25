import UserHeader from "../../../layout/user-header";
import {
  getCurrentDate,
  isEmailValid,
  isNameValid,
  isPasswordValid,
} from "../../../utils/functions";
import { useState} from "react";


function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();

  function submitFormHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    if (!isEmailValid(data.email_address)) {
      setFeedbackItems("Email is not valid!");
    } else if (!isNameValid(data.first_name + " " + data.last_name)) {
      setFeedbackItems("Name is not valid!");
    } else if (!isPasswordValid(data.password)) {
      setFeedbackItems("Password is too short!");
    }

  

    fetch("/api/user/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
        setFeedbackItems(data.message);
      });
  }

  return (
    <>
      <UserHeader />
      <div>
        <h1>The register Page</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="email_address">Your Email Address</label>
            <br />
            <input type="email" id="email_address" name="email_address" />
          </div>
          <div>
            <label htmlFor="first_name">First Name</label>
            <br />
            <input type="text" id="first_name" name="first_name" />
          </div>
          <div>
            <label htmlFor="last_name">Last Namne</label>
            <br />
            <input type="text" id="last_name" name="last_name" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="text" id="password" name="password" />
          </div>
          <button>Register</button>
        </form>
        <hr />
        <ul style={{ color: "red" }}>{feedbackItems}</ul>
      </div>
    </>
  );
}

export default SignIn;
