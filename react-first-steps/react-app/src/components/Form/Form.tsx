import { FieldValues, useForm } from 'react-hook-form'

interface FormData {
    name: string
    age: number
}

function Form() {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<FormData>()

    const onSubmit = (data: FieldValues) => console.log(data)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    {...register('name', { required: true, minLength: 3 })}
                    id="name"
                    type="text"
                    className="form-control"
                />
                {errors.name?.type === 'required' && (
                    <p className="text-danger">The name field is required.</p>
                )}
                {errors.name?.type === 'minLength' && (
                    <p className="text-danger">
                        The name must be at least 3 charachters.
                    </p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age
                </label>
                <input
                    {...register('age', { valueAsNumber: true })}
                    id="age"
                    type="number"
                    className="form-control"
                />
            </div>
            <button
                disabled={!isValid}
                className="btn btn-primary"
                type="submit"
            >
                Submit
            </button>
        </form>
    )
}

export default Form
