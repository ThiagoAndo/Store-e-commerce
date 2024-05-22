import { createSlice } from "@reduxjs/toolkit";

const confSlice = createSlice({
  name: "conf",
  initialState: {
    visible: false,
  },
  reducers: {
    toggle(state) {
      state.visible = !state.visible;
      
    },
  },
});
export const confActions = confSlice.actions;

export default confSlice;
