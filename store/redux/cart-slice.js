import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    cartIsVisible: false,
    totalCart: 0,
    createAt: null,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
      state.totalCart = state.items.reduce(
        (accumulator, item) => accumulator + item.totalPrice,
        0
      );
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.totalCart += newItem.price;
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
          createAt: newItem.createAt,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.items.forEach((item) => {
          console.log("item.totalPrice");
          console.log(item.totalPrice);
        });
      }

      state.totalCart = state.items.reduce(
        (accumulator, item) => accumulator + item.totalPrice,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("qnt", JSON.stringify(state.totalQuantity));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalCart = state.items.reduce(
        (accumulator, item) => accumulator + item.totalPrice,
        0
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
      localStorage.setItem("qnt", JSON.stringify(state.totalQuantity));
    },
    toggle(state) {
      if (state.totalQuantity === 0) state.cartIsVisible = false;
      else state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
