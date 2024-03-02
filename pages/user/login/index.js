import UserLogin from "@/components/user/UserLogin";
import { useState } from "react";
import { signIn } from "next-auth/react";
function Login() {
  const [feedback, setFeedback] = useState('');

  function handleLogin(email, password) {
    try {
      fetch(`/api/user/${email}/${password}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            setFeedback({message:"Connecting to the database failed!"});
            throw "Connecting to the database failed!";
          }
        })
        .then((data) => {
          if (data.hasOwnProperty("message")) {
            setFeedback(data);
          } else {
            signIn("credentials", {
              redirect: false,
              email: email,
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return <UserLogin handling={handleLogin} LoginBack={feedback} />;
}

export default Login;
