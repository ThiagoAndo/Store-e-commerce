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
        `http://localhost:8080/events/cart/${userId}`
        // `https://libraryapi-gtct.onrender.com/events/cart/${userId}`,
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items ,
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const id = localStorage.getItem("id");
      const response = await fetch(
        `http://localhost:8080/events/cart/new`,
        // "https://libraryapi-gtct.onrender.com/events/cart/new",
        {
          method: "POST",
          body: JSON.stringify({
            items: cart,
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
      console.log(cart.items);
    } catch (error) {}
  };
};
