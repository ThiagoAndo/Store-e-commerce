import { getUserToken } from "./functions";
const fetchDelete = async () => {
  const token = getUserToken();
  const id = localStorage.getItem("id");
  try {
    let response = await fetch(
      `http://localhost:8080/user`,
      // `https://api-store-pj2y.onrender.comv`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          id,
        }),
      }
    );

    if (response.ok) {
     return true
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
};
export default fetchDelete;
