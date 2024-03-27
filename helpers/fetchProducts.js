export async function getAllProducts() {
  try {
    // let response = await fetch("http://localhost:8080/events/products");
    let response = await fetch("https://libraryapi-gtct.onrender.com/events/products");

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}

