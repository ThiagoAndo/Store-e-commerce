import { createSlice } from "@reduxjs/toolkit";
const record = (items, totalQuantity) => {
  localStorage.setItem("cart", JSON.stringify(items));
  localStorage.setItem("qnt", JSON.stringify(totalQuantity));
};
const some = (items) =>
  items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );
const totalQnt = (items) =>
  items.reduce((accumulator, item) => accumulator + item.quantity, 0);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
    cartIsVisible: false,
    totalCart: 0,
    oneTimeReplace: 0,
  },
  reducers: {
    replaceCart(state, action) {
      if (!state.oneTimeReplace > 0) {
        state.totalQuantity = totalQnt(action.payload.items);
        state.items = action.payload.items;
        state.totalCart = some(action.payload.items);
      }
      state.oneTimeReplace++;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      if (!existingItem) {
        state.totalCart += newItem.price;
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        state.totalQuantity = totalQnt(state.items);
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity = totalQnt(state.items);
      }
      state.totalCart = some(state.items);
      record(state.items, state.totalQuantity);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalCart = some(state.items);
      record(state.items, state.totalQuantity);
      state.totalQuantity = totalQnt(state.items);
    },
    removeAll(state) {
      state.items.length = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("qnt");
    },
    toggle(state) {
      if (state.totalQuantity === 0) state.cartIsVisible = false;
      else state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
