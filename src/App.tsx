import { TodoInput, TodoList, TodoManager } from "./components"
import { TodoProvider } from "./context"

import "./app.css"

function App() {

  return (
    <div className="app-container">
      <h2 className="app-title">todos</h2>
      <div className="todo-card">
        <TodoProvider>
          <TodoInput />
          <TodoList />
          <TodoManager />
        </TodoProvider>
      </div>
    </div>
  )
}

export default App
