import { createContext, useContext, useReducer, useState, type ReactNode } from "react"
import type { Action, State, Todo } from "../../types"
import type { FilterType, TodoContextType } from "../../types/store/store";

const initialState: State = {
  todos: [],
}

function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload.trim() === "") return state;
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.trim(),
        completed: false,
      }
      return { todos: [...state.todos, newTodo] }

    case "TOGGLE_TODO":
      return {
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      }

    case "CLEAR_COMPLETED":
      return {
        todos: state.todos.filter(todo => !todo.completed),
      };

    default:
      return state
  }
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider")
  }
  return context
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [filter, setFilter] = useState<FilterType>("all")

  const addTodo = (text: string) => dispatch({ type: "ADD_TODO", payload: text })
  const toggleTodo = (id: number) => dispatch({ type: "TOGGLE_TODO", payload: id })
  const clearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" })

  const remainingCount = state.todos.filter((todo) => !todo.completed).length

  const filteredTodos = state.todos.filter(todo => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  return (
    <TodoContext.Provider value={{ todos: filteredTodos, addTodo, toggleTodo, remainingCount, filter, setFilter, clearCompleted }}>
      {children}
    </TodoContext.Provider>
  )
}
