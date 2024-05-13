export default async function fetchUserAdd(id) {
  try {
    let response = await fetch(`http://localhost:8080/add/${id}`);
    // let response = await fetch(
    //   `https://libraryapi-gtct.onrender.com/add/${id}`
    // );

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}
