import { createSlice } from "@reduxjs/toolkit";
// Redux slice to handle the visibility and type of a checkout confirmation modal
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
