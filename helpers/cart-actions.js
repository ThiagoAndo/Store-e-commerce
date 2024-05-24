import { cartActions } from "../store/redux/cart-slice";
import { getUserToken } from "./functions";
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
        // `http://localhost:8080/cart/${userId}`
        `https://libraryapi-gtct.onrender.com/cart/${userId}`
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
          ["createAt"]: item.creation_at,
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
  const id = localStorage.getItem("id");

  try {
    let response = await fetch(
      // `http://localhost:8080/cart`,
      `https://libraryapi-gtct.onrender.com/cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization':
            "Bearer "+ token,
        },
        body: JSON.stringify({
          item: cart,
          id,
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

export const deleteCartData = async (cart, op) => {
  const token = getUserToken();

  try {
    let response = await fetch(
      // `http://localhost:8080/cart`,
      `https://libraryapi-gtct.onrender.com/cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': "Bearer " + token,
        },
        body: JSON.stringify({
          cart,
          op,
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
      // `http://localhost:8080/cart`,
      `https://libraryapi-gtct.onrender.com/cart`,
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
