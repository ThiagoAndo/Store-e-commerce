import UserHeader from "../../../layout/user-header";

import { useState, useRef } from "react";

function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();

  const emailInputRef = useRef();
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const passwortInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const fName = fNameInputRef.current.value;
    const lName = lNameInputRef.current.value;
    const password = passwortInputRef.current.value;

    const reqBody = {
      email,
      fName,
      lName,
      password,
    };

    fetch("/api/user/new", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.resp.error);
      });
  }

  return (
    <>
      <UserHeader />
      <div>
        <h1>The register Page</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label htmlFor="email">Your Email Address</label>
            <br />
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="fName">First Name</label>
            <br />
            <input type="text" id="fName" ref={fNameInputRef} />
          </div>
          <div>
            <label htmlFor="lName">Last Namne</label>
            <br />
            <input type="text" id="lName" ref={lNameInputRef} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="text" id="password" ref={passwortInputRef} />
          </div>
          <button>Register</button>
        </form>
        <hr />
        {/* <button onClick={loadFeedbackHandler}>Load Feedback</button> */}
        <ul>{feedbackItems}</ul>
      </div>
    </>
  );
}

export default SignIn;
