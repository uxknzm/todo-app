import { memo, useCallback, useState } from "react"
import { Input } from "../../ui"
import { useTodos } from "../../context"

const TodoInput = () => {
    const [text, setText] = useState("")
    const { addTodo } = useTodos()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (text.trim()) {
            addTodo(text.trim())
            setText("")
        }
    }

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }, [])

    return (
        <form role="form" onSubmit={handleSubmit}>
            <Input value={text} onChange={handleChange} placeholder="What needs to be done?" />
        </form>
    )
}

export default memo(TodoInput)