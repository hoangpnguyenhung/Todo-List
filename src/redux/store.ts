import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";
import themeSlice from "./features/themeSlice";
import loadingSlice from "./features/loadingSlice";

export const store = configureStore({
  reducer: {
    todoSlice: todoSlice,
    themeSlice: themeSlice,
    loadingSlice: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
