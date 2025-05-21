import { memo } from "react"
import TodoItem from "../TodoItem/TodoItem"
import { useTodos } from "../../context";

const TodoList = () => {
    const { todos } = useTodos()

    return (
        <ul role="list">
            {todos.map((todo) => (
                <TodoItem key={todo.id} completed={todo.completed} title={todo.text} id={todo.id} />
            ))}
        </ul>
    )
}

export default memo(TodoList)