import { useState, useRef } from "react";
import UserHeader from "../../../layout/user-header";

function Login() {
  const [feedback, setFeedback] = useState("Your data will apear here");
  const [resp, setResp] = useState(false);

  const emailInputRef = useRef();
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const passwortInputRef = useRef();
console.log(emailInputRef)
  function submitFormHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwortInputRef.current.value;

    const reqBody = {
      email,
      password,
    };
    fetch("/api/user/login").then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.err);
        });
      })
      .then((data) => {
        console.log(data.user.first_name)
        setResp(true);
        setFeedback(data.user.first_name);
      })
      .catch((error) => {
        setResp(false);
        setFeedback(error.message);
      });
  }

  return (
    <>
      <UserHeader />
      <div>
        <h1>The Log in Page</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label style={{ color: "gray" }} htmlFor="email">
              Your Email Address
            </label>
            <br />
            <input type="email" id="email" ref={emailInputRef} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input type="text" id="password" ref={passwortInputRef} />
            <br />
          </div>
          <button>Log in</button>
        </form>
        <hr />
        <ul style={{ color: "green", listStyle: "none" }}>
          {resp && (
            <>
              <li>{feedback}</li>
            </>
          )}
          {!resp && (
            <>
              <li>{feedback}</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Login;
