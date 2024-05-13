import { cartActions } from "../store/redux/cart-slice";

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

export const fetchCartData = () => {
  const userId = localStorage.getItem("id");
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/cart/${userId}`
        // `https://libraryapi-gtct.onrender.com/cart/${userId}`
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

export const sendCartData = (cart) => {
  console.log("cart");
  return async (dispatch) => {
    const sendRequest = async () => {
      const id = localStorage.getItem("id");
      const response = await fetch(
        `http://localhost:8080/cart`,
        // "https://libraryapi-gtct.onrender.com/cart",
        {
          method: "POST",
          body: JSON.stringify({
            item: cart,
            id,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteCartData = async (cart, op) => {
  try {
    let response = await fetch(`http://localhost:8080/cart`, {
      method: "DELETE",
      body: JSON.stringify({
        cart,
        op,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
};

export const updateCartData = async (cart) => {
  try {
    let response = await fetch(
      `http://localhost:8080/cart`,
      //   `https://libraryapi-gtct.onrender.com/add/${id}`

      {
        method: "PATCH",
        body: JSON.stringify({
          cart,
        }),
        headers: {
          "Content-Type": "application/json",
        },
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
