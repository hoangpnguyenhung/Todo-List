import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface loadingType {
  loading: boolean;
}

const initialState: loadingType = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
