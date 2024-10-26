import { getUserToken } from "./functions";
import { cartActions } from "@/store/redux/cart-slice";
export const getStorageData = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const qntTotal = Number(localStorage.getItem("qnt"));
  return (dispatch) => {
    if (qntTotal > 0) {
      dispatch(
        cartActions.replaceCart({
          items: cart,
          totalQuantity: qntTotal,
        })
      );
    }
  };
};

export const fetchCartData = (userId) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/cart/${userId}`
        // `https://api-store-pj2y.onrender.com/cart/${userId}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();
      return data;
    };

    try {
      const { items } = await fetchData();
      const transData = items.map((item) => {
        return {
          ["id"]: item.item_id,
          ["price"]: item.price,
          ["quantity"]: item.qnt,
          ["totalPrice"]: item.price,
          ["name"]: item.name,
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

export const sendCartData = async (cart) => {
  const token = getUserToken();
  const user_id = localStorage.getItem("id");
  try {
    let response = await fetch(
      `http://localhost:8080/cart`,
      // `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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

export const deleteCartData = async (user_id) => {
  const token = getUserToken();

  try {
    let response = await fetch(
      `http://localhost:8080/cart`,
      // `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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


export const deleteCartItem = async (cart) => {
  const token = getUserToken();

  try {
    let response = await fetch(
      `http://localhost:8080/cart/item`,
      // `https://api-store-pj2y.onrender.com/cart/item`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
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


export const updateCartData = async (cart) => {
  const token = getUserToken();
  try {
    let response = await fetch(
      `http://localhost:8080/cart`,
      // `https://api-store-pj2y.onrender.com/cart`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token,
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
