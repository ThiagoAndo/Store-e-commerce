import { createSlice } from "@reduxjs/toolkit";

// Stores the cart items and total quantity in localStorage
const record = (items, totalQuantity) => {
  localStorage.setItem("cart", JSON.stringify(items));
  localStorage.setItem("qnt", JSON.stringify(totalQuantity));
};

// Calculates the total price of all items in the cart
const some = (items) =>
  items.reduce(
    (accumulator, item) => accumulator + item.price * item.quantity,
    0
  );

// Calculates the total quantity of items in the cart
const totalQnt = (items) =>
  items.reduce((accumulator, item) => accumulator + item.quantity, 0);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Array of cart items
    totalQuantity: 0, // Total quantity of items in the cart
    changed: false, // Tracks if the cart state has been modified
    cartIsVisible: false, // Determines if the cart UI should be displayed
    totalCart: 0, // Total price of all items in the cart
    oneTimeReplace: 0, // Ensures replaceCart only runs once on initialization
  },
  reducers: {
    // Replaces the entire cart state with incoming data, but only once
    replaceCart(state, action) {
      if (!state.oneTimeReplace > 0) {
        state.totalQuantity = totalQnt(action.payload.items);
        state.items = action.payload.items;
        state.totalCart = some(action.payload.items);
      }
      state.oneTimeReplace++;
    },
    // Adds a new item to the cart or updates the quantity of an existing item
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true; // Mark state as changed
      if (!existingItem) {
        // Add new item to the cart
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
        // Update quantity of existing item
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity = totalQnt(state.items);
      }
      state.totalCart = some(state.items);
      record(state.items, state.totalQuantity); // Update localStorage
    },
    // Removes one unit of an item from the cart or deletes the item if quantity is 1
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.changed = true; // Mark state as changed
      if (existingItem.quantity === 1) {
        // Remove item from the cart
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        // Decrease quantity of the item
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      state.totalCart = some(state.items);
      record(state.items, state.totalQuantity); // Update localStorage
      state.totalQuantity = totalQnt(state.items);
    },
    // Clears all items from the cart
    removeAll(state) {
      state.items.length = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cart");
      localStorage.removeItem("qnt");
    },
    // Toggles the visibility of the cart UI
    toggle(state) {
      if (state.totalQuantity === 0) state.cartIsVisible = false;
      else state.cartIsVisible = !state.cartIsVisible;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
