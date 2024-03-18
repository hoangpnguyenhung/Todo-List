import { todo } from "../redux/features/todoSlice";

export const todosFinished = (todos: todo[]): todo[] =>
  todos.filter((todo) => todo.state === false).reverse();
export const todosNotFinished = (todos: todo[], query: string): todo[] =>
  todos
    .filter((todo) => todo.state === true && todo.name.includes(query))
    .reverse();
