import { memo, useCallback, type FC } from "react"
import { Checkbox } from "../../ui"

import "./style.css"
import type { TodoItemProps } from "./types"
import { useTodos } from "../../context"

const TodoItem: FC<TodoItemProps> = ({ completed, title, id }) => {
    const { toggleTodo } = useTodos()

    const handleClickItem = useCallback(() => {
        toggleTodo(id)
    }, [id])

    const handleClickCheckbox = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        toggleTodo(id)
    }, [id])

    return (
        <li className="todo-item-container" onClick={handleClickItem}>
            <Checkbox checked={completed} onChange={handleClickCheckbox} />
            <p style={{ textDecoration: completed ? "line-through" : "none" }}>{title}</p>
        </li>
    )
}

export default memo(TodoItem)
