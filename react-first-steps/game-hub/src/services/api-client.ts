import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '4b7d37c7e4d64d1db1a4bfbf7ab6bae3'
    }
})
