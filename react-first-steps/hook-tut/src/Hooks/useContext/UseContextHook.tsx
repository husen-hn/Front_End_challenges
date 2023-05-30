import { useState } from 'react'
import AuthContext from './auth-context'
import Auth from './Auth'

function UseContextHook() {
    const [authStauts, setAuthStatus] = useState(false)
    const login = () => {
        setAuthStatus(!authStauts)
    }

    return (
        <>
            <AuthContext.Provider value={{ status: authStauts, login: login }}>
                <Auth />
            </AuthContext.Provider>
        </>
    )
}

export default UseContextHook
