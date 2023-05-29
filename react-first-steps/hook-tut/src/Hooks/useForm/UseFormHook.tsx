import { FieldErrors, FieldValues, useForm } from 'react-hook-form'

function UseFormHook() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const handleRegistration = (data: FieldValues) => console.log(data)
    const handleError = (errors: FieldErrors) => console.log(errors)

    const registerOptions = {
        name: { required: 'Name is required' },
        email: { required: 'Email is required' },
        password: {
            required: 'Password is required',
            minLength: {
                value: 8,
                message: 'Password must have at least 8 characters'
            }
        }
    }

    return (
        <form
            className="w-full max-w-sm"
            onSubmit={handleSubmit(handleRegistration, handleError)}
        >
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Full Name
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#8931B9]"
                        type="text"
                        placeholder="Jane Doe"
                        {...register('name', registerOptions.name)}
                    />
                    {errors.name?.type === 'required' && (
                        <p className="text-[#8931B9] text-sm">
                            The Full Name field is required.
                        </p>
                    )}
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Email
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#8931B9]"
                        type="email"
                        placeholder="example@expl.com"
                        {...register('email', registerOptions.email)}
                    />

                    {errors.name?.type === 'required' && (
                        <p className="text-[#8931B9] text-sm">
                            The Email field is required.
                        </p>
                    )}
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Password
                    </label>
                </div>
                <div className="md:w-2/3">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#8931B9]"
                        id="inline-password"
                        type="password"
                        placeholder="**********"
                        {...register('password', registerOptions.password)}
                    />

                    {errors.name?.type === 'required' && (
                        <p className="text-[#8931B9] text-sm">
                            The Password field is required.
                        </p>
                    )}
                    {errors.name?.type === 'minLength' && (
                        <p className="text-[#8931B9] text-sm">
                            The Password must be at least 8 charachters.
                        </p>
                    )}
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button
                        className="shadow bg-[#8931B9] hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </form>
    )
}

export default UseFormHook
