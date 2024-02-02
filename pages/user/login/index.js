import { useState, useRef } from "react";
import UserHeader from "../../../components/layout/user-header";
// import { error } from "console";

function Login() {
  const [feedback, setFeedback] = useState("Your data will apear here");
  const [resp, setResp] = useState(false);

  const emailInputRef = useRef();
  const passwortInputRef = useRef();
  function submitFormHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwortInputRef.current.value;

    try {
      fetch(`/api/user/${email}/${password}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setResp(false);
            setFeedback("Connecting to the database failed!");
            throw "Connecting to the database failed!";
          }
        })
        .then((data) => {
          if (data.hasOwnProperty("message")) {
            setResp(false);
            setFeedback(data.message);
          } else {
            setResp(true);
            setFeedback(data.first_name);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <UserHeader />
      <div>
        <h1>The Log in Page</h1>
        <form onSubmit={submitFormHandler}>
          <div>
            <label style={{ color: "blue" }} htmlFor="email">
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


