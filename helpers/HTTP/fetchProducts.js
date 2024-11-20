export async function getAllProducts() {
  try {
    // let response = await fetch("http://localhost:8080/products");
    let response = await fetch("https://api-store-pj2y.onrender.com/products");

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}


export async function getProductById(id) {
  try {
    // let response = await  fetch(`http://localhost:8080/products/byid/${id}`);
    let response = await fetch(`https://api-store-pj2y.onrender.com/products/byid/${id}`);

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}
