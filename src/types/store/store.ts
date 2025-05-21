export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface State {
    todos: Todo[];
};

export type Action =
    | { type: "ADD_TODO"; payload: string }
    | { type: "TOGGLE_TODO"; payload: number }
    | { type: "CLEAR_COMPLETED" }

export interface TodoContextType {
    todos: Todo[]
    addTodo: (text: string) => void
    toggleTodo: (id: number) => void
    clearCompleted: () => void
    remainingCount: number
    filter: FilterType
    setFilter: (filter: FilterType) => void
};

export type FilterType = "all" | "active" | "completed"