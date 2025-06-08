import { createSlice } from "@reduxjs/toolkit";

const videoDetailsSidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleSidebar } = videoDetailsSidebarSlice.actions;
export default videoDetailsSidebarSlice.reducer;