import { createContext, useContext } from "react";
import { TodoContextType } from "../assets/types";

export const TodoContext = createContext<TodoContextType>({ loading: true });

export const useTodoContext = () => {

  const { tasks, setTasks, loading } = useContext(TodoContext);

  // if (!setTasks && !tasks) {
  //   throw Error('setTasks function and tasks array is mandatory in TodoContext')
  // }

  return { tasks, setTasks, loading }

}
