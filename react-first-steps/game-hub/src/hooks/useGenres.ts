import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import { CanceledError } from 'axios'
import useData from './useData'

export interface Genre {
    id: number
    name: string
}

interface FetchGenresResponse {
    count: number
    results: Genre[]
}

const useGenres = () => useData<Genre>('/genres')

export default useGenres
