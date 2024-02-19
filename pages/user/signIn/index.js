import UserSignIn from "@/components/user/UserSignIn";
import { isEmailValid, isNameValid, isPasswordValid } from "@/utils/functions";
import { useState } from "react";
function SignIn() {
  const [feedbackItems, setFeedbackItems] = useState();
  const [hasData, setHasData] = useState(true);

  function submitFormHandler() {
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const email = isEmailValid(data.email_address);
    const name = isNameValid(data.first_name + " " + data.last_name);
    const password = isPasswordValid(data.password);

    if (!email) {
      setFeedbackItems("Email is not valid!");
    } else if (!name) {
      setFeedbackItems("Name is not valid!");
    } else if (!password) {
      setFeedbackItems("Password is too short!");
    }
    if (email && name && password) {
      try {
        fetch("/api/user/new", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              setFeedbackItems("Connecting to the database failed!");
              throw "Connecting to the database failed!";
            }
          })
          .then((data) => {
            console.log(data.hasOwnProperty("message"));
            if (data.hasOwnProperty("message")) {
              setFeedbackItems(data.message);
            } else {
              setFeedbackItems(data.first_name);
            }
          });
      } catch (error) {
        console.log.apply(error);
      }
    }
  }

  return (
    <UserSignIn submitHandler={submitFormHandler} feedBack={feedbackItems} />
  );
}

export default SignIn;
