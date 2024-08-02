import { createSlice } from "@reduxjs/toolkit";

const confSlice = createSlice({
  name: "conf",
  initialState: {
    visible: false,
    confType: null,
  },
  reducers: {
    toggle(state) {
      state.visible = !state.visible;
    },
    changeType(state, action) {
      state.confType = action.payload;
    },
  },
});
export const confActions = confSlice.actions;

export default confSlice;
