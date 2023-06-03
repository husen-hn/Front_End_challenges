import axios from 'axios'

const API_URL = 'https://example.com/api'

export interface Todo {
    id: number
    title: string
    completed: boolean
}

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`)
    return response.data
}

export const createTodo = async (title: string): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, { title })
    return response.data
}

export const updateTodo = async (
    id: number,
    completed: boolean
): Promise<Todo> => {
    const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed })
    })

    if (!response.ok) {
        throw new Error('Failed to update todo')
    }

    return response.json()
}

export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`)
}
