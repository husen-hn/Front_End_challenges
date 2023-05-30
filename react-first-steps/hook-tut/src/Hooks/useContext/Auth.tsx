import { useContext } from 'react'
import AuthContext from './auth-context'

function Auth() {
    const auth = useContext(AuthContext)
    return (
        <div>
            <h1 className="m-10">Are you authenticated?</h1>
            {auth.status ? (
                <p className="m-10 text-2xl font-bold text-[#1D8991]">
                    Yes you are
                </p>
            ) : (
                <p className="m-10 text-2xl font-bold text-[#DA103F]">Nopes</p>
            )}
            <button
                className="shadow bg-[#FAC29A] hover:bg-[#F9CEC3] focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 m-10 rounded"
                onClick={auth.login}
            >
                Click To Login
            </button>
        </div>
    )
}

export default Auth
