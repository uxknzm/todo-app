import { memo } from "react"
import { Button } from "../../ui"

import "./style.css"
import { useTodos } from "../../context";

const TodoManager = () => {
    const { remainingCount, filter, setFilter, clearCompleted } = useTodos();

    return (
        <div className="todo-manager-container">
            <p className="todo-manager-count">{remainingCount} items left</p>
            <div className="todo-manager-filter">
                <Button onClick={() => setFilter("all")} style={{ border: filter === "all" ? "1px solid" : "none" }}>All</Button>
                <Button onClick={() => setFilter("active")} style={{ border: filter === "active" ? "1px solid" : "none" }}>Active</Button>
                <Button onClick={() => setFilter("completed")} style={{ border: filter === "completed" ? "1px solid" : "none" }}>Completed</Button>
            </div>
            <Button onClick={clearCompleted}>Clear completed</Button>
        </div>
    )
}

export default memo(TodoManager)