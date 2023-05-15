import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import { AxiosRequestConfig, CanceledError } from 'axios'

interface FetchResponse<T> {
    count: number
    results: T[]
}

const useData = <T>(
    endPoint: string,
    requstConfig?: AxiosRequestConfig,
    deps?: any[]
) => {
    const [data, setData] = useState<T[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(
        () => {
            setLoading(true)
            const controller = new AbortController()
            apiClient
                .get<FetchResponse<T>>(endPoint, {
                    signal: controller.signal,
                    ...requstConfig
                })
                .then((res) => {
                    setData(res.data.results)
                    setLoading(false)
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return
                    setError(err.message)
                    setLoading(false)
                })

            return () => controller.abort()
        },
        deps ? [...deps] : []
    )

    return { data, error, loading }
}

export default useData
