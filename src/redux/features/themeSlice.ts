import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface themeMode {
  mode: "dark" | "light";
}

const initialState: themeMode = {
  mode: "dark",
};

export const themeSlice = createSlice({
  name: "themeMode",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<"dark" | "light">) => {
      state.mode = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
