import { useRef } from "react";
import style from "./UserLogin.module.css";
// import { error } from "console";

function UserLogin({ handle, response, feedback }) {
  const emailInputRef = useRef();
  const passwortInputRef = useRef();

  function loginHandler(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwortInputRef.current.value;
    handle(email, password);
  }

  return (
    <>
      <div className={style.container}>
        <form className={style.form} onSubmit={loginHandler}>
          <label className={style.label} htmlFor="email">
            Your Email Address
          </label>
          <br />
          <input
            className={style.input}
            type="email"
            id="email"
            ref={emailInputRef}
          />
          <br />
          <label className={style.label} htmlFor="password">
            Password
          </label>
          <br />
          <input
            className={style.input}
            type="text"
            id="password"
            ref={passwortInputRef}
          />
          <br />
          <button className={style.button}>Sign in Securely </button>
        </form>

        <div className={style.advantages}>
          <h3>✔ Receive special offers and promotions.</h3>
          <h3>✔ Speed your way through checkout.</h3>
          <h3>✔ View your order history and your current addresses.</h3>
          <h3>✔ Access your saved items. </h3>
          <h3>✔ Instant access to your account.</h3>
        </div>
      </div>
      <hr />
      <ul style={{ color: "green", listStyle: "none" }}>
        {response && (
          <>
            <li>{feedback}</li>
          </>
        )}
        {!response && (
          <>
            <li>{feedback}</li>
          </>
        )}
      </ul>
    </>
  );
}

export default UserLogin;
