import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Todo, createTodo, deleteTodo, fetchTodos, updateTodo } from './TodoFn'

const App = () => {
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const queryClient = useQueryClient()

    const { data: todos, isLoading } = useQuery<Todo[]>(
        ['todos'],
        fetchTodos
    ) as { data: Todo[]; isLoading: boolean }

    const createTodoMutation = useMutation(createTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
            setNewTodoTitle('')
        }
    })

    const updateTodoMutation = useMutation(
        ['updateTodo'],
        ({ id, completed }: { id: number; completed: boolean }) =>
            updateTodo(id, completed),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['todos'])
            }
        }
    )

    const deleteTodoMutation = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries(['todos'])
        }
    })

    const handleNewTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        createTodoMutation.mutate(newTodoTitle)
    }

    const handleTodoCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        todo: Todo
    ) => {
        updateTodoMutation.mutate({
            id: todo.id,
            completed: event.target.checked
        })
    }

    const handleTodoDeleteClick = (todo: Todo) => {
        deleteTodoMutation.mutate(todo.id)
    }

    return (
        <div>
            <h1>Todos</h1>
            <form onSubmit={handleNewTodoSubmit}>
                <input
                    type="text"
                    value={newTodoTitle}
                    onChange={(event) => setNewTodoTitle(event.target.value)}
                />
                <button type="submit" disabled={createTodoMutation.isLoading}>
                    Add Todo
                </button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={(event) =>
                                        handleTodoCheckboxChange(event, todo)
                                    }
                                />
                                {todo.title}
                            </label>
                            <button
                                type="button"
                                onClick={() => handleTodoDeleteClick(todo)}
                                disabled={deleteTodoMutation.isLoading}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App
