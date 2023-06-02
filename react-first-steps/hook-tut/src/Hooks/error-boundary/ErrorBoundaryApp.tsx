function ErrorBoundaryApp() {
    const getError = () => {
        throw new Error('Error')
    }

    return getError()
}

export default ErrorBoundaryApp
