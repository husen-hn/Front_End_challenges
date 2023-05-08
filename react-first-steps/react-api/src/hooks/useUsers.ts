import { useEffect, useState } from 'react'
import userService, { User } from '../services/user-service'
import { CanceledError } from 'axios'

const useUsers = () => {
    const [users, setUsers] = useState<User[]>([])
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            const { request, cancel } = userService.getAll<User>()

            request
                .then((res) => setUsers(res.data))
                .catch((err) => {
                    if (err instanceof CanceledError) return
                    setError(err.message)
                })
            setIsLoading(false)

            return () => cancel
        }

        fetchUsers()
    }, [])

    return { users, error, isLoading, setUsers, setError }
}

export default useUsers
