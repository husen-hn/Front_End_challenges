import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()

function TanstackQuery() {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}

export default TanstackQuery
