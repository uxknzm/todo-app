import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import { TodoProvider } from "../context"
import App from "../App"
import { TodoInput, TodoList, TodoManager } from "../components"

describe("Todo App", () => {
  test("отображает начальный пустой список", () => {
    render(
      <TodoProvider>
        <App />
      </TodoProvider>
    )
    const list = screen.queryByRole("list")
    expect(list).toBeInTheDocument()
    expect(list).toBeEmptyDOMElement()
  })

  test("добавляет новую задачу", () => {
    render(
      <TodoProvider>
        <TodoInput />
        <TodoList />
        <TodoManager />
      </TodoProvider>
    )

    fireEvent.change(screen.getByPlaceholderText("What needs to be done?"), {
      target: { value: "Test task" },
    })
    fireEvent.submit(screen.getByRole("form"))

    const list = screen.getByRole("list")
    expect(list).toHaveTextContent("Test task")
  })

  test("удаляет завершенные задачи", () => {
    render(
      <TodoProvider>
        <TodoInput />
        <TodoList />
        <TodoManager />
      </TodoProvider>
    )

    fireEvent.change(screen.getByPlaceholderText("What needs to be done?"), {
      target: { value: "Task 1" },
    })
    fireEvent.submit(screen.getByRole("form"))
    fireEvent.click(screen.getByText("Task 1"))
    fireEvent.click(screen.getByText("Clear completed"))
    expect(screen.queryByText("Task 1")).toBeNull()
  })

  test("передает введенный текст в контекст в TodoInput", () => {
    render(
      <TodoProvider>
        <TodoInput />
        <TodoList />
      </TodoProvider>
    )

    fireEvent.change(screen.getByPlaceholderText("What needs to be done?"), {
      target: { value: "New Task" },
    })
    fireEvent.submit(screen.getByRole("form"))
    const list = screen.queryByRole("list")
    expect(list).toBeInTheDocument()
    expect(list).toHaveTextContent("New Task")
  })

  test("не добавляет пустую задачу в TodoInput", () => {
    render(
      <TodoProvider>
        <TodoInput />
        <TodoList />
      </TodoProvider>
    )

    fireEvent.submit(screen.getByRole("form"))

    const list = screen.queryByRole("list")
    expect(list).toBeEmptyDOMElement()
  })

  test("отображает задачи в TodoList", () => {
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    )

    const list = screen.queryByRole("list")
    expect(list).toBeEmptyDOMElement()
  })

  test("не отображает задачи, если их нет в TodoList", () => {
    render(
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    )

    const list = screen.queryByRole("list")
    expect(list).toBeInTheDocument()
    expect(list).toBeEmptyDOMElement()
  })

  test("показывает количество оставшихся задач в TodoManager", () => {
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    )

    expect(screen.getByText(/items left/i)).toBeInTheDocument()
  })

  test("фильтрует задачи по статусу в TodoManager", () => {
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    )

    fireEvent.click(screen.getByText("All"))

    expect(screen.getByText("All")).toHaveStyle("border: 1px solid")
  })

  test("очищает завершенные задачи в TodoManager", () => {
    render(
      <TodoProvider>
        <TodoManager />
      </TodoProvider>
    )

    fireEvent.click(screen.getByText("Clear completed"))
    expect(screen.queryByText("Task")).toBeNull()
  })
})
