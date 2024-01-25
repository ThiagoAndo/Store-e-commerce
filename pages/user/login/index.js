import { useState, useRef } from "react";
import UserHeader from "../../../layout/user-header";

function Login() {
  const [feedback, setFeedback] = useState("Your data will apear here");
  const [resp, setResp] = useState(false);

  const emailInputRef = useRef();
  const fNameInputRef = useRef();
  const lNameInputRef = useRef();
  const passwortInputRef = useRef();
  function submitFormHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwortInputRef.current.value;

    const reqBody = {
      email,
      password,
    };
    fetch(`/api/user/${email}/${password}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        if (data.event.message) {
          setResp(false);
          setFeedback(data.event.message);
        } else {
          setResp(true);
          setFeedback(data.user.first_name);
        }
      });
   
  }

  return (
    <>
      <UserHeader />
      <div>
        <h1>The Log in Page</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label style={{ color: "green" }} htmlFor="email">
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
