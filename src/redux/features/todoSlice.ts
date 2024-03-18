import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface todo {
  id: number;
  name: string;
  state?: boolean;
}

const todoLists: todo[] = JSON.parse(localStorage.getItem("todoApp") || "[]");

export interface TodoState {
  todoList: todo[];
  todo: todo | null;
  query: string;
}

const initialState: TodoState = {
  todoList: todoLists || [],
  todo: null,
  query: "",
};

export const todoSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    getList: (state) => {
      state.todoList = JSON.parse(localStorage.getItem("todoApp") || "[]");
    },
    addTodo: (state, action: PayloadAction<string>) => {
      if (state.todoList && state.todoList.length > 0) {
        state.todoList = [
          ...state.todoList,
          {
            id: state.todoList[state.todoList.length - 1].id + 1,
            name: action.payload,
            state: true,
          },
        ];
      } else {
        state.todoList = [
          ...state.todoList,
          { id: 1, name: action.payload, state: true },
        ];
      }

      localStorage.setItem("todoApp", JSON.stringify(state.todoList));
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(
        (task) => task.id !== action.payload
      );
      localStorage.setItem("todoApp", JSON.stringify(state.todoList));
    },
    updateTodo: (state, action: PayloadAction<todo>) => {
      const todoList = state.todoList.filter(
        (task) => task.id !== action.payload.id
      );
      state.todoList = [...todoList, action.payload];

      localStorage.setItem(
        "todoApp",
        JSON.stringify(
          state.todoList.sort((a, b) =>
            a.id > b.id ? 1 : a.id < b.id ? -1 : 0
          )
        )
      );
    },
    getTodoById: (state, action: PayloadAction<number>) => {
      state.todo =
        state.todoList.find((task) => task.id === action.payload) || null;
    },
    getQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export const {
  addTodo,
  getList,
  getTodoById,
  removeTodo,
  updateTodo,
  getQuery,
} = todoSlice.actions;

export default todoSlice.reducer;
