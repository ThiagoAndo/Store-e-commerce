import { useState, useEffect } from "react";


export default function useFill(){
  const [user, setUser] = useState([[], []]);

  useEffect(() => {
    setTimeout(() => {
      setUser([
        [
          localStorage.getItem("first"),
          localStorage.getItem("last"),
          localStorage.getItem("email"),
        ],
        [
          localStorage.getItem("line_one"),
          localStorage.getItem("line_two"),
          localStorage.getItem("town_city"),
          localStorage.getItem("constry_state"),
        ],
      ]);
    }, 500);
  }, [setUser]);

  return user
}