import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    menuVisible: false,
  },
  reducers: {
    visible(state) {
      state.menuVisible = true;
    },
    hidden(state) {
      state.menuVisible = false;
    },
  },
});
export const userActions = userSlice.actions;

export default userSlice;
