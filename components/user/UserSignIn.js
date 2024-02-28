import { useState } from "react";

function UserSignIn({ submitHandler, feedBack }) {
  function handleSubmit(event) {
    event.preventDefault();
    submitHandler();
  }
  return (
    <>
      <div>
        <h1>The register Page</h1>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="last_name">Last Name</label>
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
        <ul style={{ color: "red" }}>{feedBack}</ul>
      </div>
    </>
  );
}

export default UserSignIn;
