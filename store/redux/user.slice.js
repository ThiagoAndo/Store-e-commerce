import { createSlice } from "@reduxjs/toolkit";
// Redux slice to handle the visibility of the user menu on hover
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
