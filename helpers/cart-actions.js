import { getUserToken } from "./functions";
import { cartActions } from "@/store/redux/cart-slice";
/**
 * Fetches cart data from localStorage and dispatches it to the Redux store.
 * Ensures the cart's items and total quantity are synchronized with the application state.
 */
export const getStorageData = () => {
  const cart = JSON.parse(localStorage.getItem("cart")); // Retrieves stored cart items
  const qntTotal = Number(localStorage.getItem("qnt")); // Retrieves the total quantity
  return (dispatch) => {
    if (qntTotal > 0) {
      // Dispatches an action to update the cart in Redux
      dispatch(
        cartActions.replaceCart({
          items: cart,
          totalQuantity: qntTotal,
        })
      );
    }
  };
};

/**
 * Fetches cart data from the API for a specific user and updates the Redux store.
 * It reformats the fetched data to match the structure used by the application.
 * @param {string} userId - The ID of the user whose cart data is being fetched.
 */
export const fetchCartData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        // `http://localhost:8080/cart/${userId}`
        `https://api-store-pj2y.onrender.com/cart/${userId}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const { items } = await fetchData();
      // Transforms the fetched data into the structure expected by the app
      const transData = items.map((item) => {
        return {
          id: item.item_id,
          price: item.price,
          quantity: item.qnt,
          totalPrice: item.price,
          name: item.name,
        };
      });

      dispatch(
        cartActions.replaceCart({
          items: transData,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Sends the user's cart data to the API for storage in the database.
 * @param {Array} cart - The cart data to be sent to the API.
 */
export const sendCartData = async (cart) => {
  const token = getUserToken(); // Retrieves the user's authentication token
  const user_id = localStorage.getItem("id"); // Retrieves the user's ID
  try {
    let response = await fetch(
      // `http://localhost:8080/cart`,
      `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Adds authentication header
        },
        body: JSON.stringify({
          item: cart,
          user_id,
        }),
      }
    );

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
};

/**
 * Deletes the user's entire cart data from the database.
 * @param {string} user_id - The ID of the user whose cart data is being deleted.
 */
export const deleteCartData = async (user_id) => {
  const token = getUserToken(); // Retrieves the user's authentication token

  try {
    let response = await fetch(
      // `http://localhost:8080/cart`,
      `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Adds authentication header
        },
        body: JSON.stringify({
          user_id,
        }),
      }
    );

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
};

/**
 * Deletes a specific item from the user's cart in the database.
 * @param {Object} cart - The cart item to be deleted.
 */
export const deleteCartItem = async (cart) => {
  const token = getUserToken(); // Retrieves the user's authentication token

  try {
    let response = await fetch(
      // `http://localhost:8080/cart/item`,
      `https://api-store-pj2y.onrender.com/cart/item`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Adds authentication header
        },
        body: JSON.stringify({
          cart,
        }),
      }
    );

    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
};

/**
 * Updates the user's cart data in the database with new information.
 *
 * @param {Array} cart - The updated cart data to be sent to the API.
 */
export const updateCartData = async (cart) => {
  const token = getUserToken(); // Retrieves the user's authentication token
  try {
    let response = await fetch(
      // `http://localhost:8080/cart`,
      `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token, // Adds authentication header
        },
        body: JSON.stringify({
          cart,
        }),
      }
    );
    if (response.ok) {
      response = await response.json();
      return response;
    }
  } catch (error) {
    return { error: "Connecting to the database failed!" };
  }
};
