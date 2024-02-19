import UserLogin from "@/components/user/UserLogin";
import { useState } from "react";

function Login() {
  const [feedback, setFeedback] = useState("Your data will apear here");
  const [resp, setResp] = useState(true);
  function handleLogin(email, password) {
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
  return <UserLogin handle={handleLogin} response={resp} feedback={feedback} />;
}

export default Login;
