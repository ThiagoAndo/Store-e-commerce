export async function getAllProducts() {
  try {
    let response = await fetch("http://localhost:8080/events/products");
    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
}


// export async function selectedId(id) {
//   return {
//     id,
//     title: "",
//     description: ""
//   };
// }