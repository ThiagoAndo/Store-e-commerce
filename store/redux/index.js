import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import userSlice from "./user.slice";
import confSlice from "./conf.slice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    conf: confSlice.reducer,
  },
});

export default store;
